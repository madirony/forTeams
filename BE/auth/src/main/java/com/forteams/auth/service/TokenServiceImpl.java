package com.forteams.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl {

    @Value("${app.secret-key}")
    private String secretKey;

    public String getMsUuidFromJwt(HttpServletRequest request) {
        // 쿠키 배열에서 ACCESS_TOKEN 이름을 가진 쿠키를 찾기
        Optional<Cookie> jwtCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> "ACCESS_TOKEN".equals(cookie.getName()))
                .findFirst();

        if (jwtCookie.isPresent()) {
            String jwtToken = jwtCookie.get().getValue();
            // JWT 파싱하여 Claims 객체 얻기
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey.getBytes())
                    .parseClaimsJws(jwtToken);
            // subject (msUuid) 추출
            return claims.getBody().getSubject();
        } else {
            return null; // 쿠키가 없거나 적합한 쿠키를 찾지 못했을 때
        }
    }

    public String getMsUuidFromTmpACCESS(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies(); // 요청에서 쿠키 배열을 가져옵니다.
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("TMP_ACCESS".equals(cookie.getName())) { // 특정 이름을 가진 쿠키를 찾습니다.
                    return cookie.getValue(); // 쿠키의 값을 반환합니다.
                }
            }
        }
        return null; // 해당 이름의 쿠키가 없는 경우 null을 반환합니다.
    }
}
