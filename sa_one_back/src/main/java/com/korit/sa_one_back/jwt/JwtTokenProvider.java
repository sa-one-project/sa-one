package com.korit.sa_one_back.jwt;

import com.korit.sa_one_back.entity.UserEntity;
import io.jsonwebtoken.*;
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

    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getPayload();
    }

    public boolean isOAuth2TempToken(Claims claims) {
        Object type = claims.get("type");
        return type != null && "OAUTH2_TEMP".equals(type.toString());
    }

    public String createOAuth2TempToken(String oauth2Id, String provider, String email, String name) {
        Date now = new Date();
        long expiredTime = now.getTime() + (1000L * 60L * 10L); // 10분
        Date expiredDate = new Date(expiredTime);

        return Jwts.builder()
                .subject("oauth2 temp token")
                .issuer("wan03224")
                .issuedAt(now)
                .expiration(expiredDate)
                .claim("type", "OAUTH2_TEMP")
                .claim("oauth2Id", oauth2Id)
                .claim("provider", provider)
                .claim("email", email)
                .claim("name", name)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


}
