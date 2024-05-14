package com.forteams.auth.service.token;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomTokenServiceImpl implements CustomTokenService {

    @Value("${app.secret-key}")
    private String secretKey;

    public String getMsUuidFromTmpACCESS(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies(); // 요청에서 쿠키 배열을 가져옵니다.
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("TMP_ACCESS".equals(cookie.getName())) { // "TMP_ACCESS" 이름을 가진 쿠키를 찾습니다.
                    return cookie.getValue(); // 쿠키의 값(유저의 msUuid)을 반환합니다.
                }
            }
        }
        return null; // 해당 이름의 쿠키가 없는 경우 null을 반환합니다.
    }
}
