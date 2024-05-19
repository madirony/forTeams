package com.forteams.auth.controller;

import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.entity.UserEntity;
import com.forteams.auth.service.*;
import com.forteams.auth.service.token.CustomTokenService;
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

    private final CustomOidcUserServiceImpl customOidcUserServiceImpl;
    private final CustomTokenService tokenService;
    private final AuthService authService;

    /**
     * 로그인 시도
     * 기존에 없는 유저이면 회원가입 로직으로 이동
     *
     * @param authentication
     * @return
     */
    @GetMapping("/welcome")
    public ResponseEntity<?> welcomePage(OAuth2AuthenticationToken authentication) {
        log.info("/welcome 도착 *************************************");
        if (authentication != null) {
            // 사용자 이름 가져오기.Principal의 이름은 기본적으로 "sub" 클레임에 매핑됨.
//            String username = authentication.getPrincipal().getName(); //uid?

            // OIDC 사용자 정보 가져오기
            Map<String, Object> userAttributes = authentication.getPrincipal().getAttributes();
            String email = (String) userAttributes.get("email"); //내 이메일
            String name = (String) userAttributes.get("name"); //내 이름
            log.info(">>>>>>>>          "+email);
            log.info(">>>>>>>>          "+name);
            MsUserEntity loginnedUser = authService.findOrCreateUser(email, name);
            return new ResponseEntity<>(loginnedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>("Authentication token not found!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 정보 저장 버튼 클릭 시, 추가 정보 받기
     *
     * 회원 가입 시, 추가 정보 입력 받아서 users 테이블에 정보 저장
     *
     * users 테이블에 필요한 정보:
     *  - 쿠키(jwt-> msUuid)
     *  - 입력값: dept
     *  - redis: 닉네임 set에서 하나 가져오기
     *
     * @param request
     * @param response
     * @param dept
     * @return
     */
    @PostMapping("/info")
    public ResponseEntity<String> submitAdditionalInfo(HttpServletRequest request, HttpServletResponse response,  @RequestParam(name = "dept") String dept) {
        // 1. request -> jwt -> subject값 (== msUuid) 가져오기
        String msUuid = tokenService.getMsUuidFromTmpACCESS(request);
        if (msUuid == null) return new ResponseEntity<>("JWT token not found!", HttpStatus.UNAUTHORIZED);

        // 2. Service로 msUuid와 dept 넘기기
        authService.updateAdditionalInfo(msUuid, dept, response);
        return ResponseEntity.ok("회원가입 완료 msUuid: " + msUuid + ", dept: " + dept);
    }

    /**
     * 로그아웃 시도
     *  - 쿠키에서 jwt 토큰 제거
     *  - 세션 무효화
     *
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 JWT 토큰 제거 + 2. 세션 무효화 서비스에서 처리
        authService.logout(request, response);
        // 3. 로그아웃 성공 메시지 반환
        return ResponseEntity.ok("로그아웃 완료!!!");
    }

    /**
     * 정보 변경하기
     *      *  = 부서 이동 시, 마이페이지에서 사용
     *
     * @param msUuid
     * @param userDept
     * @return
     */
    @PostMapping("/changeInfo/{msUuid}/{userDept}")
    public ResponseEntity<String> changeInfo(@PathVariable String msUuid, @PathVariable String userDept) {
        UserEntity userEntity = authService.changeDept(msUuid, userDept);

        if(userEntity == null) return new ResponseEntity<>("정보 변경 실패 - 찾을 수 없는 사용자!", HttpStatus.UNAUTHORIZED);

        return ResponseEntity.ok("부서 변경 완료!!!");
    }
}
