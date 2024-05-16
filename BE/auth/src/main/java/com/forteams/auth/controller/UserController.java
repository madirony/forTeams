package com.forteams.auth.controller;

import com.forteams.auth.provider.JwtProvider;
import com.forteams.auth.service.token.RedisService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

/**
 * 토큰, 인증 관련 컨트롤러
 */

@RestController
@Slf4j
@RequiredArgsConstructor
@Getter
@Setter
@RequestMapping("/api/v1/user")
public class UserController {

    @Value("${app.secret-key}")
    private String secretKey;

    private final RedisService redisService;
    private final JwtProvider jwtProvider;

    @PostMapping("/refresh-token")
    public ResponseEntity<?> regenerateJwt(HttpServletRequest request) {
        String expiredToken = request.getHeader("Authorization").substring(7);
        String subject = null; //msUuid

        try{
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                    .build()
                    .parseClaimsJws(expiredToken);
            subject = claims.getBody().getSubject(); //accessToken의 uuid
        } catch (ExpiredJwtException e) {
            subject = e.getClaims().getSubject(); // 토큰이 만료되어도 subject(uuid)는 추출
        }

        if (subject == null) { //없는 사용자
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }

        String refreshToken = redisService.getData(subject);
        if (refreshToken == null || !jwtProvider.validateRefreshToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or Expired Refresh Token");
        }

        String newAccessToken = jwtProvider.generateAccessToken(subject);
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + newAccessToken).build();

    }

//    @GetMapping
}
