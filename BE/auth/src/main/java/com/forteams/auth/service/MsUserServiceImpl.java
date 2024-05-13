package com.forteams.auth.service;

import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.entity.UserEntity;
import com.forteams.auth.provider.JwtProvider;
import com.forteams.auth.repository.MsUserRepository;
import com.forteams.auth.repository.UserRepository;
import com.forteams.auth.service.redis.RedisService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MsUserServiceImpl implements MsUserService {
    private final MsUserRepository msUserRepository;
    private final UserRepository userRepository;
    private final NicknameServiceImpl nicknameService;
    private final JwtProvider jwtProvider;
    // Redis에서 CustomOAuth2User를 저장하기 위한 service
    private final RedisService redisService;

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
    public boolean isExistEmail(String email) {
        Optional<MsUserEntity> msUserEntity = msUserRepository.findByMicrosoftId(email);
        if (msUserEntity.isPresent()) return true; //있는 유저
        return false; //없는 유저 -> 회원가입 필요
    }

    @Override
    public void updateAdditionalInfo(String msUuid, String userDept, HttpServletResponse response) {
        MsUserEntity msUserEntity = msUserRepository.findByMsUuid(msUuid);
        if (msUserEntity != null) {

            // 새 UserEntity 객체 생성 및 msUserEntity와 연결
            UserEntity newUserEntity = new UserEntity();
            newUserEntity.setMsUserEntity(msUserEntity);
            newUserEntity.setUserRole("ROLE_USER");
            newUserEntity.setUserDept(userDept);
            newUserEntity.setUserNickname(nicknameService.assignNickname()); //redis에서 꺼내오기

            userRepository.save(newUserEntity);

            //jwt 빚어서 쿠키 굽기
            String accessJwt = jwtProvider.generateAccessToken(msUuid); //  =======> accessToken을 안 쓰는데 뭐냐악...
            Cookie cookie = new Cookie("ACCESS_TOKEN", accessJwt); // 쿠키 생성
            cookie.setHttpOnly(false); // 자바스크립트 접근 허용
            cookie.setSecure(false); // HTTPS 통신에서만 쿠키 전송이 아니라 다 허용
            cookie.setPath("/"); // 쿠키의 경로 설정
            cookie.setMaxAge(7 * 24 * 60 * 60); // 쿠키 만료 시간 설정 (예: 1주일)
            response.addCookie(cookie); // 응답에 쿠키 추가

            // <msUuid, refreshToken>로 map만들어서 redis에 넣기 -----------------------------------------------------
            String refreshJwt = jwtProvider.generateRefreshToken(msUuid);
            redisService.saveData(msUuid, refreshJwt, 14);
            Map<String, Object> redisData = new HashMap<>();
//        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
            redisData.put(msUuid, refreshJwt);
        }
    }
}
