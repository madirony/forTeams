package com.forteams.auth.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.forteams.auth.entity.CustomOAuth2User;
import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.repository.MsUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserServiceImpl extends OidcUserService {

    private final MsUserRepository msUserRepository;

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);
        String oauthClientName = userRequest.getClientRegistration().getClientName(); //microsoft
//        System.out.println(oauthClientName); Microsoft 가 나옴

//        try {
//            System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

//        MsUserEntity msUserEntity = null;
        String microsoftId = oidcUser.getAttributes().get("email").toString();
        String userName = oidcUser.getAttributes().get("name").toString();
//        System.out.println("CustomOAuth2UserServiceImpl에서 이멜과 이름: " + microsoftId+ " "+userName);

        // 새 MsUserEntity 생성 또는 기존 사용자 로드
        MsUserEntity msUserEntity = msUserRepository.findByMicrosoftId(microsoftId)
                .orElseGet(() -> {
                    MsUserEntity newUser = new MsUserEntity(microsoftId, userName);
                    msUserRepository.save(newUser);
                    return newUser;
                });
        String loginnedUserUuid = msUserEntity.getMsUuid();

        return new CustomOAuth2User(oidcUser, loginnedUserUuid);
    }
}
