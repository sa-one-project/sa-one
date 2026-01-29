package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.response.ApiRespDto;
import com.korit.sa_one_back.dto.response.OwnerDayAttendanceRespDto;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.OwnerAttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stores/{storeId}/owner")
public class OwnerAttendanceController {

    private final OwnerAttendanceService ownerAttendanceService;

    // 예: /stores/1/owner/attendance?date=2026-01-26
    @GetMapping("/attendance")
    public ApiRespDto<OwnerDayAttendanceRespDto> getDay(@PathVariable Long storeId,
                                                        @RequestParam("date") LocalDate date,
                                                        @AuthenticationPrincipal PrincipalUser principal) {

        Long userId = principal.getUserId();
        String role = principal.getAuthorities().iterator().next().getAuthority();

        OwnerDayAttendanceRespDto data = ownerAttendanceService.getDay(storeId, date, userId, role);
        return ApiRespDto.ok("출근 현황 조회 성공", data);
    }
}
