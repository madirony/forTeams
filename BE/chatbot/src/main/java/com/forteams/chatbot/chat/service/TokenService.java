package com.forteams.chatbot.chat.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;

@Service
@Slf4j
public class TokenService {

    private Key key;

    @Value("${app.secret-key}")
    public void setSecretKey(String secretKey) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }
    public String validateTokenAndGetMsUuid(String jwt) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            log.warn("Token expired: ", e);
            return null;  // Or handle token renewal here
        } catch (Exception e) {
            log.error("Token validation error: ", e);
            return null;
        }
    }
}
