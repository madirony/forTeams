package com.forteams.auth.service.token;

import jakarta.servlet.http.HttpServletRequest;

public interface CustomTokenService {
//    String getMsUuidFromJwt(HttpServletRequest request);

    String getMsUuidFromTmpACCESS(HttpServletRequest request);
}
