package com.forteams.auth.service.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Redis 서비스
 */

@Component
@Slf4j
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    // 유저 데이터, refresh 토큰, 생성된 시간 저장 - 로그인 상태 유지(14일)

    public void saveData(String msUuid, String refreshToken, long time) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.append(msUuid, refreshToken);
        redisTemplate.expire(msUuid, time, TimeUnit.DAYS);
    }

    // msUuid와 연관된 refreshToken 반환
    public String getData(String msUuid) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return (String) valueOperations.get(msUuid);
    }

    public void deleteData(String msUuid) {
        redisTemplate.delete(msUuid);
    }
    public boolean existsData(String msUuid) {
        return redisTemplate.hasKey(msUuid);
    }
    public void updateData(String msUuid, String refreshToken, long time) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(msUuid, refreshToken);
        redisTemplate.expire(msUuid, time, TimeUnit.DAYS);
    }
    public void extendExpiration(String msUuid, long extraTime) {
        redisTemplate.expire(msUuid, extraTime, TimeUnit.DAYS);
    }

}