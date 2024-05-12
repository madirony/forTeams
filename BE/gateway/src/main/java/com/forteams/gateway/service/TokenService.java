package com.forteams.gateway.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;


import java.security.Key;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String secretKey;
    // TODO: secretKey(ENC필수)바탕으로 복호화, 유효기간 확인, 재발급 처리 여기서 하면 됨
    public String validateTokenAndGetMsUuid(String token) {
        try {
            return null;
        } catch (Exception e){
            return null;
        }
    }

}
