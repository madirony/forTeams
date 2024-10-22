package com.forteams.auth.handler;

import com.forteams.auth.entity.CustomOidcUser;
import com.forteams.auth.provider.JwtProvider;
import com.forteams.auth.provider.JwtInCookieRedis;
import com.forteams.auth.repository.UserRepository;
import com.forteams.auth.service.token.RedisService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
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
//    private final RedisService redisService;
    private final UserRepository userRepository;
    private final JwtInCookieRedis jwtInCookieRedis;

    @Value("${app.secret-key}")
    private String secretKey;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        CustomOidcUser oAuth2User = (CustomOidcUser) authentication.getPrincipal();
        log.info("흠.........1");
        String msUuid = oAuth2User.getMsUuid();
        log.info("흠....1.5 "+ msUuid);
        if( userRepository.findByMsUserEntity_MsUuid(msUuid) != null ) {
            log.info("흠.........2");
            Map<String, String> tokens = getTokens(oAuth2User);
            // msUuid+accessToken으로 jwt 만들기 -> cookie에 담을 예정 -----------------------------------------------
            String accessJwt = jwtProvider.generateAccessToken(msUuid); //  =======> accessToken을 안 쓰는데 뭐냐악...

            Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

            try {
                log.info("try들어옴.........!!!");
                String subject = Jwts.parserBuilder()
                        .setSigningKey(key)

                        .build()
                        .parseClaimsJws(accessJwt)
                        .getBody()
                        .getSubject();
                System.out.println(">>>>      "+subject);


            } catch (ExpiredJwtException e) {
                log.info("흠.........3");
                System.out.println("Token expired           !!!!!!!!!");
            } catch (JwtException e) {
                log.info("흠.........4");
                System.out.println("Token validation error       !!!!!!!!!!");
//                e.printStackTrace();
            } catch (Exception e) {
                log.info("흠.........5");
                System.out.println("Token processing error          !!!!!!!!!!" );
//                e.printStackTrace();
            }
            log.info("흠.........6");
            jwtInCookieRedis.putAccessJwtInCookie(accessJwt, 7 * 24 * 60 * 60, response);

            // <msUuid, refreshToken>로 map만들어서 redis에 넣기 -----------------------------------------------------
            String refreshJwt = jwtProvider.generateRefreshToken(msUuid);
            jwtInCookieRedis.putRefreshJwtInRedis(msUuid, refreshJwt);

            // 로그인 성공
            log.debug("[OAuthLoginSuccessHandler] - LOGIN SUCCESS : {} FROM 마이크로솦", oAuth2User.getName());

            // 추가 정보를 받을지(새로운 유저), 안 받을지(기존 유저) 분기
            response.sendRedirect("https://forteams.co.kr/main"); // (기존 유저) 메인 페이지로
        }
        else {
            Cookie cookie = new Cookie("TMP_ACCESS", msUuid);
            cookie.setHttpOnly(false); // 자바스크립트 접근 허용
            cookie.setSecure(false); // HTTPS 통신에서만 쿠키 전송이 아니라 다 허용
            cookie.setPath("/"); // 쿠키의 경로 설정
            cookie.setMaxAge(24 * 60 * 60); // 쿠키 만료 시간 설정 (예: 1일)
            response.addCookie(cookie); // 응답에 쿠키 추가
            // test
            response.sendRedirect("https://forteams.co.kr/logininfo"); // (새로운 유저) 추가 정보 받으러 가는 페이지 (jwt들고 감)

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

        return tokens;
    }

}
