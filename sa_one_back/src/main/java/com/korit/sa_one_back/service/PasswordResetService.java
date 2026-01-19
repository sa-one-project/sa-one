package com.korit.sa_one_back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final StringRedisTemplate redisTemplate;
    private static final String prefix = "password-reset:";
    private static final long ttl_min = 30;

    public void save(String token, Long userId) {
        redisTemplate.opsForValue().set(
                prefix + token,
                userId.toString(),
                ttl_min,
                TimeUnit.MINUTES
        );
    }

    public Long getUserId(String token) {
        String v = redisTemplate.opsForValue().get(prefix + token);
        return v == null ? null : Long.valueOf(v);
    }

    public void delete(String token) {
        redisTemplate.delete(prefix + token);
    }
}
