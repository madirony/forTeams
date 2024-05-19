package com.forteams.auth.service.token;

public interface RedisService {
    void saveData(String msUuid, String refreshToken, long time);

    String getData(String msUuid);
}
