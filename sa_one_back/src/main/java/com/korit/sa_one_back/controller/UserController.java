package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.UpdateMyPageReqDto;
import com.korit.sa_one_back.dto.response.UserMeRespDto;
import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

//    @GetMapping("/me")
//    public ResponseEntity<UserEntity> getMe(@AuthenticationPrincipal PrincipalUser principalUser) {
//
//        return ResponseEntity.ok(principalUser.getUser());
//    }
    @GetMapping("/api/me")
    public ResponseEntity<UserMeRespDto> getMyPage(
            Authentication authentication,
            @RequestParam(required = false) Long storeId
    ) {

        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        Long userId = principalUser.getUser().getUserId();
        UserMeRespDto resp = userService.getMyPage(userId, storeId);

        return ResponseEntity.ok(resp);
    }

    @PatchMapping("/api/me")
    public ResponseEntity<Void> updateMyPage(
            Authentication authentication,
            @RequestBody UpdateMyPageReqDto dto
    ) {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        Long userId = principalUser.getUser().getUserId();
        userService.updateMyPage(userId, dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/delete/me")
    public ResponseEntity<?> deleteMe(@AuthenticationPrincipal PrincipalUser principalUser) throws IllegalAccessException {

        if (principalUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        userService.delete(principalUser.getUserId());

        return ResponseEntity.ok().body("회원탈퇴 완료");
    }
}
