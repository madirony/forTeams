package com.forteams.auth.service;

import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.entity.UserEntity;
import com.forteams.auth.provider.JwtProvider;
import com.forteams.auth.provider.JwtInCookieRedis;
import com.forteams.auth.repository.MsUserRepository;
import com.forteams.auth.repository.UserRepository;
import com.forteams.auth.service.nickname.NicknameServiceImpl;
import com.forteams.auth.service.token.RedisService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final MsUserRepository msUserRepository;
    private final UserRepository userRepository;
    private final NicknameServiceImpl nicknameService;
    private final JwtProvider jwtProvider;
    // Redis에서 CustomOAuth2User를 저장하기 위한 service
//    private final RedisService redisService;
    private final JwtInCookieRedis jwtInCookieRedis;

    @Override
    public MsUserEntity findOrCreateUser(String microsoftId, String userName) {
        Optional<MsUserEntity> optionalUser = msUserRepository.findByMicrosoftId(microsoftId);

        return optionalUser.orElseGet(() -> {
            MsUserEntity newUser = new MsUserEntity();
            newUser.setMicrosoftId(microsoftId);
            newUser.setUserName(userName);
            return msUserRepository.save(newUser);
        });
    }

    @Override
    public void updateAdditionalInfo(String msUuid, String userDept, HttpServletResponse response) {
        MsUserEntity msUserEntity = msUserRepository.findByMsUuid(msUuid);
        if (msUserEntity != null) {

            // 새 UserEntity 객체 생성 및 msUserEntity와 연결
            makeAndStoreNewUserEntity(msUserEntity, userDept); //안에서 nicknameService.assignNickname()

            //jwt 빚어서 쿠키 굽기
            String accessJwt = jwtProvider.generateAccessToken(msUuid); //  =======> accessToken을 안 쓰는데 뭐냐악...
            jwtInCookieRedis.putAccessJwtInCookie(accessJwt, 7 * 24 * 60 * 60, response);

            //기존 토큰(TMP_ACCESS) null값으로 변경
            jwtInCookieRedis.removeTmpTokenFromCookie(response);

            // <msUuid, refreshToken>로 map만들어서 redis에 넣기 -----------------------------------------------------
            String refreshJwt = jwtProvider.generateRefreshToken(msUuid);
            jwtInCookieRedis.putRefreshJwtInRedis(msUuid, refreshJwt);
        }
    }

    // 추가 정보가 들어온 새로운 유저 정보를 users테이블에 저장
    private void makeAndStoreNewUserEntity(MsUserEntity msUserEntity, String userDept) {
        UserEntity newUserEntity = new UserEntity();
        newUserEntity.setMsUserEntity(msUserEntity);
        newUserEntity.setUserRole("ROLE_USER");
        newUserEntity.setUserDept(userDept);
        newUserEntity.setUserNickname(nicknameService.assignNickname());

        userRepository.save(newUserEntity);
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 JWT 토큰 제거
        jwtInCookieRedis.removeJwtFromCookie(response);

        // 2. 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    /**
     * 회원 정보 변경
     *
     * @param msUuid
     * @param userDept
     * @return
     */
    @Override
    public UserEntity changeDept(String msUuid, String userDept) {
        UserEntity userEntity = userRepository.findByMsUserEntity_MsUuid(msUuid);
        if (userEntity != null) {
            userEntity.setUserDept(userDept);
            userRepository.save(userEntity); // 변경된 userDept를 데이터베이스에 저장
            return userEntity; // 업데이트된 userEntity 반환
        }
        return null; // userEntity가 null이면 null 반환
    }
}
