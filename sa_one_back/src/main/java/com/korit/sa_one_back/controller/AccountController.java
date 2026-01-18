package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.FindUsernameReqDto;
import com.korit.sa_one_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/account")
public class AccountController {

    private final UserService userService;

    @PostMapping("/find-username")
    public ResponseEntity<?> findUsername(@RequestBody FindUsernameReqDto dto) {
        userService.findUsernameAndSendMail(dto);

        return ResponseEntity.ok(Map.of(
                "message", "입력하신 정보와 일치하는 계정이 있으면 이메일을 보냈습니다."
        ));
    }
}
