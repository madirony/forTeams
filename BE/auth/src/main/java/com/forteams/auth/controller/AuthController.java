package com.forteams.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/auth-service")
public class AuthController {

    Environment env;

    public AuthController(Environment env){
        this.env = env;
    }

    @GetMapping("/login")
    public String getLoginPage(HttpServletRequest request){
//        public ResponseEntity<String> getLoginPage(){
        System.out.println("히히");
        log.info("server port :{}",request.getServerPort());
//        return ResponseEntity.ok("Login Page!");

        // 할당되어진 정보 얻어오기
        return String.format("PORT : %s",env.getProperty("local.server.port"));
    }
}
