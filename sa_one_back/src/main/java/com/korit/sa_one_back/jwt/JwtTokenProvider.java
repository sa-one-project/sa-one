package com.korit.sa_one_back.jwt;

import com.korit.sa_one_back.entity.UserEntity;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey key;

    public JwtTokenProvider(@Value("${jwt.secret}") String secret) {
        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(UserEntity userEntity) {

        Date now = new Date();

        long expiredTime = now.getTime() + (1000L * 60L * 60L * 24L);
        Date expiredDate = new Date(expiredTime);

        return Jwts.builder()
                .subject("server token")
                .issuer("wan03224")
                .issuedAt(new Date())
                .expiration(expiredDate)    // 필수
                .claim("userId", userEntity.getUserId())    // 필수
                .signWith(key, SignatureAlgorithm.HS256)    // 필수
                .compact();
        // 토큰이 만들어진다.
    }

    public boolean validateToken(String token) {
        try {
            JwtParser jwtParser = Jwts.parser()
                    .setSigningKey(key)
                    .build();
            jwtParser.parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public int getUserId(String token) {
        return (int) Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getPayload()
                .get("userId");
    }
}
