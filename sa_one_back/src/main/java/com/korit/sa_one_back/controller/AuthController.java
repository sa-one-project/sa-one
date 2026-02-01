package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.OAuth2SignUpReqDto;
import com.korit.sa_one_back.dto.request.SignInReqDto;
import com.korit.sa_one_back.dto.request.SignUpReqDto;
import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.jwt.JwtTokenProvider;
import com.korit.sa_one_back.mapper.UserMapper;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    @PostMapping("/api/local/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpReqDto dto) {
        userService.createLocalUser(dto);
        // 가입 후 JWT 발급
        UserEntity user = userMapper.findUserByUsername(dto.getUsername());
        if (user != null) {
            String token = jwtTokenProvider.createToken(user);
            return ResponseEntity.ok().body(token);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 후 사용자 조회 실패");
        }
    }

    @PostMapping("/api/oauth2/signup")
    public ResponseEntity<?> oauth2SignUp(@RequestBody OAuth2SignUpReqDto dto,
                                          @AuthenticationPrincipal PrincipalUser principalUser) {
        // SecurityContext에 OAuth2 인증 정보 존재
        if (principalUser == null || principalUser.isRegistered()) {
            return ResponseEntity.badRequest().body("이미 가입된 사용자 또는 인증 정보 없음");
        }

        userService.createOauth2User(dto);

        // 가입 완료 후 DB에서 다시 조회
        var user = userMapper.findByOauth2IdAndProvider(dto.getOauth2Id(), dto.getProvider());
        String token = jwtTokenProvider.createToken(user);

        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/api/local/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInReqDto dto) {
        String accessToken = userService.signin(dto);
        return ResponseEntity.ok(Map.of("accessToken", accessToken));
    }

}
