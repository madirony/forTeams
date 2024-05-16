package com.forteams.gateway.service;

import com.forteams.gateway.HeaderDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.http.HttpStatus;

import java.nio.charset.StandardCharsets;
import java.security.Key;

@Service
@Slf4j
public class TokenService {

    @Value("${jwt.secret}")
    private String secretKey;
    // TODO: secretKey(ENC필수)바탕으로 복호화, 유효기간 확인, 재발급 처리 여기서 하면 됨
    // http://auth:8443/api/v1/user/**


    public Mono<HeaderDto> validateTokenAndGetMsUuid(String jwt) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        try {
            JwtParser parser = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build();
            Claims claims = parser.parseClaimsJws(jwt)
                    .getBody();
            String subject = claims.getSubject();
            String userNickname = (String) claims.get("nickname");
            String dept = (String) claims.get("dept");
            HeaderDto headerDto = new HeaderDto(subject,userNickname,dept);
            log.debug("Parsed subject (msUuid): {}", subject);
            return Mono.just(headerDto);
        } catch (ExpiredJwtException e) {
            log.warn("Token expired: ", e);
            return renewToken(jwt);
        } catch (JwtException e) {
            log.error("Token validation error: ", e);
            return Mono.error(new RuntimeException("Invalid token"));
        } catch (Exception e) {
            log.error("Token processing error: ", e);
            return Mono.error(new RuntimeException("Token processing error"));
        }
    }

    private Mono<HeaderDto> renewToken(String jwt) {
        return WebClient.create("http://auth:8443")
                .post()
                .uri("/api/v1/user/refresh-token")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                .retrieve()
                .onStatus(HttpStatusCode::isError, response -> Mono.error(new RuntimeException("Failed to renew token")))
                .bodyToMono(String.class)
                .flatMap(newJwt -> {
                    Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
                    JwtParser parser = Jwts.parserBuilder()
                            .setSigningKey(key)
                            .build();
                    Claims claims = parser.parseClaimsJws(newJwt)
                            .getBody();
                    String subject = claims.getSubject();
                    String userNickname = (String) claims.get("nickname");
                    String dept = (String) claims.get("dept");
                    HeaderDto headerDto = new HeaderDto(subject, userNickname, dept);
                    log.debug("Renewed and parsed subject (msUuid): {}", subject);
                    return Mono.just(headerDto);
                });
    }


//    public String validateTokenAndGetMsUuid(String jwt) {
//        String subject = null;
//        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
//
//        try {
//            // 토큰 파싱 및 검증. 서명과 만료 날짜를 검사합니다.
//            subject = Jwts.parserBuilder()
//                    .setSigningKey(key)
//                    .build()
//                    .parseClaimsJws(jwt)
//                    .getBody()
//                    .getSubject();
//
//        } catch (ExpiredJwtException e) {
//            System.out.println("Token expired");
////            e.printStackTrace();
//            //여기서 레디스 찾아가서 리프래시 토큰으로 토큰 다시 발급~
//            WebClient webClient = WebClient.create();
//
//            Mono<String> tokenResponse = webClient.post()
//                    .uri("http://auth:8443/api/v1/user/refresh-token")
//                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
//                    .retrieve()
//                    .onStatus(HttpStatusCode::isError, response ->
//                            Mono.error(new RuntimeException("Failed to refresh token")))
//                    .toEntity(String.class)  // 전체 ResponseEntity를 받아옵니다.
//                    .map(response -> {
//                        // 응답 헤더에서 Authorization 값을 추출
//                        String newToken = response.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
//                        if (newToken != null && newToken.startsWith("Bearer ")) {
//                            return newToken.substring(7);  // "Bearer " 접두어를 제거
//                        }
//                        throw new RuntimeException("New access token is missing in the response");
//                    });
//
//            tokenResponse.subscribe(
//                    newToken -> {
//                        // 여기에서 newToken으로 필요한 작업 수행
//                        System.out.println("New Access Token: " + newToken);
//
//                    },
//                    error -> {
//                        // 오류 처리
//                        System.err.println("Error while refreshing token: " + error.getMessage());
//                    }
//            );
//
//            return null; // 토큰이 만료되었을 경우
//        } catch (JwtException e) {
//            System.out.println("Token validation error");
//            e.printStackTrace();
//            return null; // 토큰이 유효하지 않을 경우 (서명 불일치 등)
//        } catch (Exception e) {
//            System.out.println("Token processing error");
//            e.printStackTrace();
//            return null; // 기타 예외
//        }
//        return subject; // UUID 반환
//    }

    //레디스 뽑아오련


}
