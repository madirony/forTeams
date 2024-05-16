package com.forteams.auth.provider;

import com.forteams.auth.service.token.RedisService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 1. 만들어진 jwt토큰을 필요한 곳에 담기
 * 2. 로그아웃 시, jwt 제거
 *
 *  - accessToken은 cookie에 담기
 *  - refreshToken은 redis에 담기
 */

@Component
@RequiredArgsConstructor
public class JwtInCookieRedis {

    private final RedisService redisService;

    /**
     * JWT(accessToken) 생성 후, cookie에 토큰 저장
     * @param accessJwt
     * @param maxAge
     * @param response
     */
    public void putAccessJwtInCookie(String accessJwt, int maxAge, HttpServletResponse response) {
        Cookie cookie = new Cookie("ACCESS_TOKEN", accessJwt); // 쿠키 생성
        cookie.setHttpOnly(false); // 자바스크립트 접근 허용
        cookie.setSecure(true); // HTTPS 통신에서만 쿠키 전송이 아니라 다 허용
        cookie.setPath("/"); // 쿠키의 경로 설정
        cookie.setMaxAge(maxAge); // 쿠키 만료 시간 설정 (예: 1주일)
        response.addCookie(cookie); // 응답에 쿠키 추가
    }

    /**
     * JWT(refreshToken) 생성 후, redis에 토큰 저장
     * @param msUuid
     * @param refreshJwt
     */
    public void putRefreshJwtInRedis(String msUuid, String refreshJwt) {
        redisService.saveData(msUuid, refreshJwt, 14);
        Map<String, Object> redisData = new HashMap<>();
//        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        redisData.put(msUuid, refreshJwt);
    }

    /**
     * 로그아웃 시, 쿠키에서 jwt 제거
     * @param response
     */
    public void removeJwtFromCookie(HttpServletResponse response) {
        Cookie jwtCookie = new Cookie("ACCESS_TOKEN", null);
        jwtCookie.setHttpOnly(false);
        jwtCookie.setSecure(true); // HTTPS를 사용하는 경우 true로 설정
        jwtCookie.setMaxAge(0);
        jwtCookie.setPath("/");
        response.addCookie(jwtCookie);
    }
}
