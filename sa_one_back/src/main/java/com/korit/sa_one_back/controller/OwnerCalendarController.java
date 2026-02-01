package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.response.ApiRespDto;
import com.korit.sa_one_back.dto.response.EmployeeCalendarRespDto;
import com.korit.sa_one_back.dto.response.OwnerCalendarRespDto;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.OwnerCalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stores/{storeId}/owner")
public class OwnerCalendarController {

    private final OwnerCalendarService ownerCalendarService;

    // 사장 월 캘린더 전체
    @GetMapping("/api/calendar")
    public ApiRespDto<OwnerCalendarRespDto> getOwnerMonth(@PathVariable Long storeId,
                                                          @RequestParam int year,
                                                          @RequestParam int month,
                                                          @AuthenticationPrincipal PrincipalUser principal) {

        Long userId = principal.getUserId();
        String role = principal.getAuthorities().iterator().next().getAuthority();

        OwnerCalendarRespDto data = ownerCalendarService.getOwnerMonth(storeId, year, month, userId, role);
        return ApiRespDto.ok("직원 캘린더 조회 성공", data);
    }

    // 사장 -> 직원 개인 캘린더(월)
    @GetMapping("/api/employees/{storeEmployeeId}/calendar")
    public ApiRespDto<EmployeeCalendarRespDto> getOwnerEmployeeMonth(@PathVariable Long storeId,
                                                                     @PathVariable Long storeEmployeeId,
                                                                     @RequestParam int year,
                                                                     @RequestParam int month,
                                                                     @AuthenticationPrincipal PrincipalUser principal) {

        Long userId = principal.getUserId();
        String role = principal.getAuthorities().iterator().next().getAuthority();

        EmployeeCalendarRespDto data = ownerCalendarService.getOwnerEmployeeMonth(
                storeId, storeEmployeeId, year, month, userId, role
        );
        return ApiRespDto.ok("직원 개인 캘린더 조회 성공", data);
    }
}
