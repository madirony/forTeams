package com.forteams.auth.controller;

import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.entity.UserEntity;
import com.forteams.auth.service.CustomOAuth2UserServiceImpl;
import com.forteams.auth.service.MsUserService;
import com.forteams.auth.service.UserServiceImpl;
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

//    Environment env;
//
//    public AuthController(Environment env){
//        this.env = env;
//    }
//
//    @GetMapping("/login")
//    public String getLoginPage(HttpServletRequest request){
////        public ResponseEntity<String> getLoginPage(){
//        System.out.println("히히");
//        log.info("server port :{}",request.getServerPort());
////        return ResponseEntity.ok("Login Page!");
//
//        // 할당되어진 정보 얻어오기
//        return String.format("PORT : %s",env.getProperty("local.server.port"));
//    }

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
            if (!msUserService.isExistEmail(email)) { //없는 유저 - 회원가입 진행하기
                MsUserEntity curSignedUpUser = msUserService.findOrCreateUser(email, name);
                //추가 정보 입력 페이지로 이동!!
                String redirectUrl = String.format("/api/v1/auth/additional-info?msUuid=%d", curSignedUpUser.getMsUuid());
                return ResponseEntity.status(HttpStatus.FOUND)
                        .header("Location", redirectUrl)
                        .build();
            }
            //있으면 회원가입 할 거 없음! -> jwt와 accessToken 발급 ->바로 챗봇 페이지로 리디렉션
            else {
                MsUserEntity loginnedUser = msUserService.findOrCreateUser(email, name);
                //To do: jwt 만들어서 들고 다니기 구현~~ provider 확인~
                return new ResponseEntity<>(loginnedUser, HttpStatus.OK);
            }
//            return new ResponseEntity<>("Welcome, " + name + "! Your email is " + email, HttpStatus.OK);
        }
        return new ResponseEntity<>("Authentication token not found!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 회원 가입 시, 추가 정보 받기
    @PostMapping("/additional-info")
    public ResponseEntity<String> submitAdditionalInfo(@RequestParam("uuid") String msUuid,
                                                       @RequestParam("dept") String userDept) {
        msUserService.updateAdditionalInfo(msUuid, userDept);
        return new ResponseEntity<>("회원가입 - 추가 정보 good", HttpStatus.OK);
        
        //To do: 잘 되는지 확인 후, jwt 토큰 넣어서 움직이기 구현
    }
}