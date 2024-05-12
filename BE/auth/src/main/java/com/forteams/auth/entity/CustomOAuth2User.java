package com.forteams.auth.entity;

import com.forteams.auth.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;

@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
public class CustomOAuth2User implements OidcUser {

    private OidcUser oidcUser;
    private String msUuid;

    @Override
    public Map<String, Object> getClaims() {
        return oidcUser.getClaims();
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return null;
    }

    @Override
    public OidcIdToken getIdToken() {
        return oidcUser.getIdToken();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oidcUser.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oidcUser.getAuthorities();
    }

    @Override
    public String getName() {
        return oidcUser.getName();
    }

    public String getMsUuid() {
        return msUuid;
    }

    public void setMsUuid(String msUuid) {
        this.msUuid = msUuid;
    }

    public UserEntity getOidcUser() {
        return (UserEntity) oidcUser;
    }

    public void setOidcUser(OidcUser oidcUser) {
        this.oidcUser = oidcUser;
    }
}
