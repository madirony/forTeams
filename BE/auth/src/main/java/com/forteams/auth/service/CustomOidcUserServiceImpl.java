package com.forteams.auth.service;


import com.forteams.auth.entity.CustomOidcUser;
import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.repository.MsUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOidcUserServiceImpl extends OidcUserService {

    private final MsUserRepository msUserRepository;

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);
        String oauthClientName = userRequest.getClientRegistration().getClientName(); //microsoft

        String microsoftId = oidcUser.getAttributes().get("email").toString();
        String userName = oidcUser.getAttributes().get("name").toString();
//        System.out.println("이메일과 실명: " + microsoftId+ " "+userName);

        log.info("야~~~~~~~호");
        // 새 MsUserEntity 생성 또는 기존 사용자 로드
        MsUserEntity msUserEntity = msUserRepository.findByMicrosoftId(microsoftId)
                .orElseGet(() -> {
                    log.info("         새로 발급....           ");
                    MsUserEntity newUser = new MsUserEntity(microsoftId, userName);
                    msUserRepository.save(newUser);
                    return newUser;
                });
        String loginnedUuid = msUserEntity.getMsUuid();

        return new CustomOidcUser(oidcUser, loginnedUuid);
    }
}
