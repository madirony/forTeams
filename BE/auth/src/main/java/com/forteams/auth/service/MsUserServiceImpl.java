package com.forteams.auth.service;

import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.entity.UserEntity;
import com.forteams.auth.repository.MsUserRepository;
import com.forteams.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MsUserServiceImpl implements MsUserService {
    private final MsUserRepository msUserRepository;
    private final UserRepository userRepository;
    private final NicknameServiceImpl nicknameService;

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
    public void updateAdditionalInfo(String msUuid, String userDept) {
        MsUserEntity msUserEntity = msUserRepository.findByMsUuid(msUuid);
        if (msUserEntity != null) {

            // 새 UserEntity 객체 생성 및 msUserEntity와 연결
            UserEntity newUserEntity = new UserEntity();
            newUserEntity.setMsUserEntity(msUserEntity);
            newUserEntity.setUserRole("ROLE_USER");
            newUserEntity.setUserDept(userDept);
            newUserEntity.setUserNickname(nicknameService.assignNickname());

            UserEntity savedUserEntity = userRepository.save(newUserEntity);
            savedUserEntity.setMsUserEntity(msUserEntity);
        }
    }
}
