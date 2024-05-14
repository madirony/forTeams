package com.forteams.auth.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 JWT 토큰 제거
        Cookie jwtCookie = new Cookie("ACCESS_TOKEN", null);
        jwtCookie.setHttpOnly(false);
        jwtCookie.setSecure(false); // HTTPS를 사용하는 경우 true로 설정
        jwtCookie.setMaxAge(0);
        jwtCookie.setPath("/");
        response.addCookie(jwtCookie);

        // 2. 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }
}
