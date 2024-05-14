package com.forteams.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    void logout(HttpServletRequest request, HttpServletResponse response);
}
