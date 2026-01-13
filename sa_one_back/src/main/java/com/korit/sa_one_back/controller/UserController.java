package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserEntity> getMe(@AuthenticationPrincipal PrincipalUser principalUser) {

        return ResponseEntity.ok(principalUser.getUser());
    }

    @PostMapping("/delete/me")
    public ResponseEntity<?> deleteMe(@AuthenticationPrincipal PrincipalUser principalUser) throws IllegalAccessException {

        if (principalUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        userService.delete(principalUser.getUserId());

        return ResponseEntity.ok().body("회원탈퇴 완료");
    }
}
