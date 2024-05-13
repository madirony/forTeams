package com.forteams.auth.service;

import com.forteams.auth.entity.MsUserEntity;
import jakarta.servlet.http.HttpServletResponse;

public interface MsUserService {
    MsUserEntity findOrCreateUser(String microsoftId, String userName);

    boolean isExistEmail(String email);

    void updateAdditionalInfo(String msUuid, String userDept, HttpServletResponse response);
}
