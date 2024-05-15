package com.forteams.auth.provider;

import com.forteams.auth.entity.UserEntity;
import com.forteams.auth.repository.UserRepository;
import com.forteams.auth.service.token.RedisService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.UUID;

/**
 * JWT 만들고
 * 유효성 검사
 */

@Component
public class JwtProvider {

    @Value("${app.secret-key}")
    private String secretKey;
    private final UserRepository userRepository;
//    private final RedisService redisService;

    @Autowired
    public JwtProvider(UserRepository userRepository, RedisService redisService ) {
        this.userRepository = userRepository;
//        this.redisService = redisService;
    }

    public String generateAccessToken(String msUuid) {
        long validity = 10800000; // 3 hours
        UserEntity user = userRepository.findByMsUserEntity_MsUuid(msUuid);
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)); // 키 생성


        return Jwts.builder()
                .setSubject(msUuid)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + validity))
                .claim("dept", user.getUserDept())
                .claim("nickname", user.getUserNickname())
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public String generateRefreshToken(String msUuid) {
        long validity = 1209600000; // 14 days
        return Jwts.builder()
                .setSubject(msUuid)
                .setId(UUID.randomUUID().toString()) // Unique identifier for the token
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + validity))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // AccessToken 유효성 검사 및 갱신
//    public String renewAccessToken(String accessToken, String msUuid) {
//        try {
//            Jwts.parser()
//                    .setSigningKey(secretKey)
//                    .parseClaimsJws(accessToken);
//            // 토큰이 아직 유효한 경우 기존 토큰 반환
//            return accessToken;
//        } catch (ExpiredJwtException e) {
//            // AccessToken 만료 시, msUuid를 사용해 refreshToken 검증 및 새 토큰 발급
//            String refreshToken = redisService.getData(msUuid);
//            if (refreshToken != null && validateRefreshToken(refreshToken)) {
//                return refreshAccessToken(refreshToken, msUuid);
//            } else {
//                throw new RuntimeException("Invalid or expired refresh token", e);
//            }
//        } catch (Exception e) {
//            // 그 외 에러 처리
//            throw new RuntimeException("Invalid Access Token", e);
//        }
//    }

    public boolean validateRefreshToken(String refreshToken) {
        try {
            // 여기서는 refreshToken의 유효성을 검증합니다.
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(refreshToken);
            return true;
        } catch (JwtException e) { //만료되거나 잘못된 서명
            return false;
        }
    }

    // refreshToken 검증 및 새 accessToken 발급
//    public String refreshAccessToken(String refreshToken, String msUuid) {
//        try {
//            Claims claims = Jwts.parser()
//                    .setSigningKey(secretKey)
//                    .parseClaimsJws(refreshToken)
//                    .getBody();
//
////            String msUuid = claims.getSubject();
//            return generateAccessToken(msUuid);
//        } catch (Exception e) {
//            // 리프레시 토큰 검증 실패 처리
//            throw new RuntimeException("Refresh Token is invalid", e);
//        }
//    }

    //jwt토큰 검증
    public String findUuidFromJwt(String jwt) {
        String subject = null;
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try {

            subject = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody()
                    .getSubject();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return subject;
    }

}
