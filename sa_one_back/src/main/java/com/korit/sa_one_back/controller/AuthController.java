package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.OAuth2SignUpReqDto;
import com.korit.sa_one_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/oauth2/signup")
    public void oauth2SignUp(@RequestBody OAuth2SignUpReqDto dto) {
        userService.createOauth2User(dto);
    }
}
