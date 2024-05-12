package com.forteams.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.InMemoryOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;

import java.util.List;

/**
 * gpt
 */

@Configuration
public class OAuth2Config {

    @Value("${spring.security.oauth2.client.registration.microsoft.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.microsoft.clientSecret}")
    private String clientSecret;

//    @Value("#{'${spring.security.oauth2.client.registration.aad.scope}'.split(',')}")
//    private List<String> scopes;

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        ClientRegistration microsoftClientRegistration = ClientRegistration.withRegistrationId("microsoft")
                .clientId(clientId)
                .clientSecret(clientSecret)
                .scope("openid", "profile", "email", "User.Read", "offline_access")
                .authorizationUri("https://login.microsoftonline.com/common/oauth2/v2.0/authorize")
                .tokenUri("https://login.microsoftonline.com/common/oauth2/v2.0/token")
                .jwkSetUri("https://login.microsoftonline.com/common/discovery/v2.0/keys")
                .userInfoUri("https://graph.microsoft.com/oidc/userinfo")
                .userNameAttributeName("sub")
                .clientName("Microsoft")
//                .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
                .redirectUri("http://localhost:8443/login/oauth2/code/microsoft")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .build();

        return new InMemoryClientRegistrationRepository(microsoftClientRegistration); //msa환경으로 변경
    }

    @Bean
    public OAuth2AuthorizedClientService authorizedClientService(ClientRegistrationRepository clientRegistrationRepository) {
        return new InMemoryOAuth2AuthorizedClientService(clientRegistrationRepository);
    }
}
