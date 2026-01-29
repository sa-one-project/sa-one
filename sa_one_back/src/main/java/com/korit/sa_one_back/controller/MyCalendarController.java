package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.response.ApiRespDto;
import com.korit.sa_one_back.dto.response.MyCalendarRespDto;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.MyCalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stores/{storeId}/me")
public class MyCalendarController {

    private final MyCalendarService myCalendarService;

    // 직원 본인: store 선택 후 월 캘린더 조회
    @GetMapping("/calendar")
    public ApiRespDto<MyCalendarRespDto> getMyMonth(@PathVariable Long storeId,
                                                    @RequestParam int year,
                                                    @RequestParam int month,
                                                    @AuthenticationPrincipal PrincipalUser principal) {

        Long userId = principal.getUserId();
        String role = principal.getAuthorities().iterator().next().getAuthority();

        MyCalendarRespDto data = myCalendarService.getMyMonth(storeId, year, month, userId, role);
        return ApiRespDto.ok("내 캘린더 조회 성공", data);
    }
}
