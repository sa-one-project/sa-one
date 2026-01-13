package com.korit.sa_one_back.controller;

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
    @GetMapping("/me")
    public ResponseEntity<UserMeRespDto> getMyPage(
            Authentication authentication,
            @RequestParam(required = false) Long storeId
    ) {
        // 1) 필터에서 principal로 넣어준 PrincipalUser 꺼내기
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();

        // 2) userId 꺼내기
        // ✅ PrincipalUser가 foundUser(UserEntity)를 들고 있으니, 거기서 userId를 꺼내면 됨
        // 아래 getter 이름은 네 PrincipalUser에 맞춰야 함.
        // 보통 Lombok @Getter면 getUser() 형태로 존재하는 경우가 많음.
        Long userId = principalUser.getUser().getUserId();

        // 3) service 호출
        UserMeRespDto resp = userService.getMyPage(userId, storeId);

        return ResponseEntity.ok(resp);
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
