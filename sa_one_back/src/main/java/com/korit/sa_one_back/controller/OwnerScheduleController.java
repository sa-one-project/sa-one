package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.CreateScheduleReqDto;
import com.korit.sa_one_back.dto.request.UpdateScheduleReqDto;
import com.korit.sa_one_back.dto.response.ApiRespDto;
import com.korit.sa_one_back.entity.ScheduleEntity;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.OwnerScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stores/{storeId}/owner")
public class OwnerScheduleController {

    private final OwnerScheduleService ownerScheduleService;

    // 등록: 사장이 가게 + 직원 선택 후 스케줄 저장
    @PostMapping("/employees/{storeEmployeeId}/schedules")
    public ApiRespDto<Map<String, Object>> create(@PathVariable Long storeId,
                                                  @PathVariable Long storeEmployeeId,
                                                  @RequestBody CreateScheduleReqDto req,
                                                  @AuthenticationPrincipal PrincipalUser principal) {

        Long userId = principal.getUserId();
        String role = principal.getAuthorities().iterator().next().getAuthority();

        ScheduleEntity entity = req.toEntity(storeEmployeeId);

        Long scheduleId = ownerScheduleService.create(storeId, storeEmployeeId, entity, userId, role);

        return ApiRespDto.ok("스케줄이 등록되었습니다", Map.of("scheduleId", scheduleId));
    }

    // 수정: 팝업에서 기존 스케줄 수정 후 저장
    @PutMapping("/schedules/{scheduleId}")
    public ApiRespDto<Void> update(@PathVariable Long storeId,
                                   @PathVariable Long scheduleId,
                                   @RequestBody UpdateScheduleReqDto req,
                                   @AuthenticationPrincipal PrincipalUser principal) {

        Long userId = principal.getUserId();
        String role = principal.getAuthorities().iterator().next().getAuthority();

        ScheduleEntity entity = req.toEntity(scheduleId);
        ownerScheduleService.update(storeId, scheduleId, entity, userId, role);

        return ApiRespDto.ok("스케줄이 수정되었습니다", null);
    }

    // 삭제: 사장만 가능
    @DeleteMapping("/schedules/{scheduleId}")
    public ApiRespDto<Void> delete(@PathVariable Long storeId,
                                   @PathVariable Long scheduleId,
                                   @AuthenticationPrincipal PrincipalUser principal) {

        Long userId = principal.getUserId();
        String role = principal.getAuthorities().iterator().next().getAuthority();

        ownerScheduleService.delete(storeId, scheduleId, userId, role);
        return ApiRespDto.ok("스케줄이 삭제되었습니다", null);
    }
}
