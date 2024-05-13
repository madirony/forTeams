package com.forteams.auth.handler;

import com.forteams.auth.entity.CustomOAuth2User;
import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.entity.UserEntity;
import com.forteams.auth.provider.JwtProvider;
import com.forteams.auth.repository.UserRepository;
import com.forteams.auth.service.CustomOAuth2UserServiceImpl;
import com.forteams.auth.service.redis.RedisService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    // 인증객체에서 CustomOAuth2User를 가져오기 위한 service
    private final OAuth2AuthorizedClientService authorizedClientService;
    // Redis에서 CustomOAuth2User를 저장하기 위한 service
    private final RedisService redisService;
    private final CustomOAuth2UserServiceImpl customOAuth2UserService;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String msUuid = oAuth2User.getMsUuid();
        if( userRepository.findByMsUserEntity_MsUuid(msUuid) != null ) {
            Map<String, String> tokens = getTokens(oAuth2User);
            // msUuid+accessToken으로 jwt 만들기 -> cookie에 담을 예정 -----------------------------------------------
            String accessJwt = jwtProvider.generateAccessToken(msUuid); //  =======> accessToken을 안 쓰는데 뭐냐악...
            Cookie cookie = new Cookie("ACCESS_TOKEN", accessJwt); // 쿠키 생성
            cookie.setHttpOnly(false); // 자바스크립트 접근 허용
            cookie.setSecure(false); // HTTPS 통신에서만 쿠키 전송이 아니라 다 허용
            cookie.setPath("/"); // 쿠키의 경로 설정
            cookie.setMaxAge(7 * 24 * 60 * 60); // 쿠키 만료 시간 설정 (예: 1주일)
            response.addCookie(cookie); // 응답에 쿠키 추가

            // <msUuid, refreshToken>로 map만들어서 redis에 넣기 -----------------------------------------------------
            String refreshJwt = jwtProvider.generateRefreshToken(msUuid);
            redisService.saveData(msUuid, refreshJwt, 14);
            Map<String, Object> redisData = new HashMap<>();
//        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
            redisData.put(msUuid, refreshJwt);

            // 로그인 성공
            log.debug("[OAuthLoginSuccessHandler] - LOGIN SUCCESS : {} FROM 마이크로솦", oAuth2User.getName());

            // 추가 정보를 받을지(새로운 유저), 안 받을지(기존 유저) 분기
            response.sendRedirect("https://forteams.co.kr"); // (기존 유저) 메인 페이지로
        }
        else {
            Cookie cookie = new Cookie("TMP_ACCESS", msUuid);
            cookie.setHttpOnly(false); // 자바스크립트 접근 허용
            cookie.setSecure(false); // HTTPS 통신에서만 쿠키 전송이 아니라 다 허용
            cookie.setPath("/"); // 쿠키의 경로 설정
            cookie.setMaxAge(24 * 60 * 60); // 쿠키 만료 시간 설정 (예: 1일)
            response.addCookie(cookie); // 응답에 쿠키 추가
            // test
            response.sendRedirect("https://forteams.co.kr/info"); // (새로운 유저) 추가 정보 받으러 가는 페이지 (jwt들고 감)

        }

        super.onAuthenticationSuccess(request, response, authentication);

    }

    // 토큰 정보 가져오기
    public Map<String, String> getTokens(@AuthenticationPrincipal OidcUser oidcUser) {
        String clientRegistrationId = "microsoft"; // 클라이언트 등록 ID (예: "kakao", "google" 등)
        String name = oidcUser.getName();

        // 인증 객체에 정보 불러오기
        OAuth2AuthorizedClient authorizedClient =
                authorizedClientService.loadAuthorizedClient(clientRegistrationId, name);

        // Access token
        OAuth2AccessToken accessToken = authorizedClient.getAccessToken();
        // Refresh token
        String refreshToken = authorizedClient.getRefreshToken().getTokenValue();

        // 토큰 반환
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken.getTokenValue());
        tokens.put("refreshToken", refreshToken);

//        System.out.println("도레미파: "+ accessToken.getTokenValue() + " 걍: " +refreshToken);
        return tokens;
    }

}
