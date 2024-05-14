package com.forteams.auth.controller;

import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.entity.UserEntity;
import com.forteams.auth.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@Getter
@Setter
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final CustomOAuth2UserServiceImpl customOAuth2UserServiceImpl;
    private final MsUserService msUserService;
    private final UserServiceImpl userService;
    private final TokenServiceImpl tokenService;
    private final AuthService authService;

    @GetMapping("/welcome")
    public ResponseEntity<?> welcomePage(OAuth2AuthenticationToken authentication) {
        if (authentication != null) {
            // 사용자 이름 가져오기.Principal의 이름은 기본적으로 "sub" 클레임에 매핑됨.
            String username = authentication.getPrincipal().getName(); //OAuth2 인증 토큰에서 제공되는 주체 이름 (subject name). 일반적으로 sub (subject) 클레임에 대응, 각 OAuth2 제공자마다 다를 수 있음.

            // OIDC 사용자 정보 가져오기
            Map<String, Object> userAttributes = authentication.getPrincipal().getAttributes();
            String email = (String) userAttributes.get("email"); //내 이메일
            String name = (String) userAttributes.get("name"); //내 이름

            //email이 ms_users 에 있는지 확인 후, 없으면 회원가입 완료! -> jwt와 accessToken 발급 -> 저장 후, 추가 정보 입력 페이지 리디렉션
//            if (!msUserService.isExistEmail(email)) { //없는 유저 - 회원가입 진행하기
//                MsUserEntity curSignedUpUser = msUserService.findOrCreateUser(email, name);
//            }
//            //있으면 회원가입 할 거 없음! -> jwt와 accessToken 발급 ->바로 챗봇 페이지로 리디렉션
//            else {
//                MsUserEntity loginnedUser = msUserService.findOrCreateUser(email, name);
//                //To do: jwt 만들어서 들고 다니기 구현~~ provider 확인~
//                return new ResponseEntity<>(loginnedUser, HttpStatus.OK);
//            }

            MsUserEntity loginnedUser = msUserService.findOrCreateUser(email, name);
            return new ResponseEntity<>(loginnedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>("Authentication token not found!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 정보 저장 버튼 클릭 시, 추가 정보 받기
    // 쿠키(jwt-> msUuid), 입력값: dept, redis: 닉네임 set에서 하나 가져오기
    @PostMapping("/info")
    public ResponseEntity<String> submitAdditionalInfo(HttpServletRequest request, HttpServletResponse response,  @RequestParam(name = "dept") String dept) {
        // 1. request -> jwt -> subject값 == msUuid 가져오기
        String msUuid = tokenService.getMsUuidFromTmpACCESS(request);
        if (msUuid == null) return new ResponseEntity<>("JWT token not found!", HttpStatus.UNAUTHORIZED);

        // 2. Service로 msUuid와 dept 넘기기
        msUserService.updateAdditionalInfo(msUuid, dept, response);
        return ResponseEntity.ok("회원가입 완료 msUuid: " + msUuid + ", dept: " + dept);
    }

    // 로그아웃 요청을 처리하는 메서드
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 JWT 토큰 제거 + 2. 세션 무효화 서비스에서 처리
        authService.logout(request, response);
        // 3. 로그아웃 성공 메시지 반환
        return ResponseEntity.ok("로그아웃 완료!!!");
    }
}
