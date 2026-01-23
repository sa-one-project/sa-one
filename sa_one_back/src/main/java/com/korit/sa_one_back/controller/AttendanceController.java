package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.AttendanceCheckInReqDto;
import com.korit.sa_one_back.dto.request.AttendanceCheckOutReqDto;
import com.korit.sa_one_back.dto.response.ApiRespDto;
import com.korit.sa_one_back.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendances")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/check-in")
    public ResponseEntity<?> checkIn(@RequestBody AttendanceCheckInReqDto reqDto) {
        Long userId = 1L;
        return ResponseEntity.status(201)
                .body(new ApiRespDto(true, "출근 완료",
                        attendanceService.checkIn(userId, reqDto)));
    }

    @PostMapping("/check-out")
    public ResponseEntity<?> checkOut(@RequestBody AttendanceCheckOutReqDto reqDto) {
        Long userId = 1L;
        return ResponseEntity.ok(
                new ApiRespDto(true, "퇴근 완료",
                        attendanceService.checkOut(userId, reqDto)));
    }
}
