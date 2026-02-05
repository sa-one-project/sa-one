package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.DeleteUserReqDto;
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

    @PostMapping("/local/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpReqDto dto) {
        userService.createLocalUser(dto);
        UserEntity user = userMapper.findUserByUsername(dto.getUsername());
        if (user != null) {
            String token = jwtTokenProvider.createToken(user);
            return ResponseEntity.ok().body(token);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 후 사용자 조회 실패");
        }
    }

    @PostMapping("/oauth2/signup")
    public ResponseEntity<?> oauth2SignUp(@RequestBody OAuth2SignUpReqDto dto,
                                          @AuthenticationPrincipal PrincipalUser principalUser) {
        if (principalUser == null || principalUser.isRegistered()) {
            return ResponseEntity.badRequest().body("이미 가입된 사용자 또는 인증 정보 없음");
        }

        dto.setOauth2Id(principalUser.getOauth2Id());
        dto.setProvider(principalUser.getProvider());
        dto.setEmail(principalUser.getEmail());
        dto.setName(principalUser.getName());

        userService.createOauth2User(dto);

        UserEntity user = userMapper.findByOauth2IdAndProvider(principalUser.getProvider(), principalUser.getOauth2Id());
        String token = jwtTokenProvider.createToken(user);
        return ResponseEntity.ok().body(token);
    }


    @PostMapping("/local/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInReqDto dto) {

        String accessToken = userService.signin(dto);

        UserEntity user = userMapper.findUserByUsername(dto.getUsername());

        return ResponseEntity.ok(Map.of(
                "accessToken", accessToken,
                "roleId", user.getRoleId()
        ));
    }

    // 회원탈퇴
    @DeleteMapping("/deleteuser")
    public ResponseEntity<?> deleteUser(@RequestBody(required = false) DeleteUserReqDto dto,
                                        @AuthenticationPrincipal PrincipalUser principalUser) throws IllegalAccessException {
        if (principalUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 정보 없음");
        }

        String password = (dto == null) ? null : dto.getPassword();
        userService.deleteUser(principalUser.getUserId(), password);

        return ResponseEntity.ok(Map.of("message", "회원탈퇴가 완료되었습니다."));
    }

}
