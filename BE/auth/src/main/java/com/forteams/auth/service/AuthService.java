package com.forteams.auth.service;

import com.forteams.auth.entity.MsUserEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    MsUserEntity findOrCreateUser(String microsoftId, String userName);

    void updateAdditionalInfo(String msUuid, String userDept, HttpServletResponse response);

    void logout(HttpServletRequest request, HttpServletResponse response);
}