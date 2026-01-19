package com.korit.sa_one_back.service;

import com.korit.sa_one_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserMapper userMapper;
    private final MailService mailService;
    private final BCryptPasswordEncoder passwordEncoder;

    private final StringRedisTemplate redisTemplate;
    private static final String prefix = "password-reset:";
    private static final long ttl_min = 30;

    @Value("${app.base-url}")
    private String baseUrl;

    public void save(String token, Long userId) {
        redisTemplate.opsForValue().set(
                prefix + token,
                userId.toString(),
                ttl_min,
                TimeUnit.MINUTES
        );
    }

    public Long getUserId(String token) {
        String value = redisTemplate.opsForValue().get(prefix + token);
        return value == null ? null : Long.valueOf(value);
    }

    public void delete(String token) {
        redisTemplate.delete(prefix + token);
    }

    public void requestPasswordReset(String email) {
        Long userId = userMapper.findUserIdByEmail(email);

        if (userId == null) {
            return;
        }

        String tempToken = UUID.randomUUID().toString().replace("-", "");

        save(tempToken, userId);

        String resetUrl = baseUrl + "/reset-password?token=" + tempToken;
        mailService.sendPasswordResetMail(email, resetUrl);
    }

    public void confirmPasswordReset(String token,
                                     String newPassword,
                                     String newPasswordConfirm) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("토큰이 유효하지 않습니다.");
        }
        if (newPassword == null || newPassword.isBlank()) {
            throw new IllegalArgumentException("비밀번호를 입력해 주세요.");
        }
        if (!newPassword.equals(newPasswordConfirm)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        Long userId = getUserId(token);
        if (userId == null) {
            throw new IllegalArgumentException("유효하지 않거나 만료된 토큰입니다.");
        }

        String encodedPassword = passwordEncoder.encode(newPassword);

        int updated = userMapper.updatePassword(userId, encodedPassword);
        if (updated == 0) {
            throw new IllegalStateException("비밀번호 변경에 실패하였습니다.");
        }

        delete(token);
    }
}