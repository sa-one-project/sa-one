//package com.korit.sa_one_back.controller;
//
//import com.korit.sa_one_back.dto.request.AttendanceCheckInReqDto;
//import com.korit.sa_one_back.dto.request.AttendanceCheckOutReqDto;
//import com.korit.sa_one_back.dto.response.ApiRespDto;
//import com.korit.sa_one_back.service.AttendanceService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/attendances")
//public class AttendanceController {
//
//    private final AttendanceService attendanceService;
//
//    @PostMapping("/check-in")
//    public ResponseEntity<?> checkIn(@RequestBody AttendanceCheckInReqDto reqDto) {
//        Long userId = 1L;
//        return ResponseEntity.status(201)
//                .body(new ApiRespDto(true, "출근 완료",
//                        attendanceService.checkIn(userId, reqDto)));
//    }
//
//    @PostMapping("/check-out")
//    public ResponseEntity<?> checkOut(@RequestBody AttendanceCheckOutReqDto reqDto) {
//        Long userId = 1L;
//        return ResponseEntity.ok(
//                new ApiRespDto(true, "퇴근 완료",
//                        attendanceService.checkOut(userId, reqDto)));
//    }
//}

//p

package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.AttendanceCheckInReqDto;
import com.korit.sa_one_back.dto.request.AttendanceCheckOutReqDto;
import com.korit.sa_one_back.dto.response.ApiRespDto;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attendances")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/api/check-in")
    public ResponseEntity<?> checkIn(@RequestBody AttendanceCheckInReqDto reqDto,
                                     @org.springframework.security.core.annotation.AuthenticationPrincipal PrincipalUser principalUser) {

        Long loginUserId = principalUser.getUserId();

        return ResponseEntity.status(201)
                .body(new ApiRespDto(true, "출근 완료",
                        attendanceService.checkIn(loginUserId, reqDto)));
    }

    @PostMapping("/api/check-out")
    public ResponseEntity<?> checkOut(@RequestBody AttendanceCheckOutReqDto reqDto,
                                      @org.springframework.security.core.annotation.AuthenticationPrincipal PrincipalUser principalUser) {

        Long loginUserId = principalUser.getUserId();

        return ResponseEntity.ok(new ApiRespDto(true, "퇴근 완료",
                attendanceService.checkOut(loginUserId, reqDto)));
    }

    @GetMapping("/api/me")
    public ResponseEntity<?> getMyAttendances(@RequestParam Long storeId,
                                              @org.springframework.security.core.annotation.AuthenticationPrincipal PrincipalUser principalUser) {

        Long loginUserId = principalUser.getUserId();

        return ResponseEntity.ok(new ApiRespDto(true, "내 출결 조회 완료",
                attendanceService.getMyAttendances(loginUserId, storeId)));
    }

    @GetMapping("/api/owner/stores/{storeId}")
    public ResponseEntity<?> getOwnerAttendances(@PathVariable Long storeId,
                                                 @RequestParam(required = false) LocalDate date,
                                                 @org.springframework.security.core.annotation.AuthenticationPrincipal PrincipalUser principalUser) {

        Long loginUserId = principalUser.getUserId();
        LocalDate workDate = (date == null) ? LocalDate.now() : date;

        return ResponseEntity.ok(new ApiRespDto(true, "매장 출근현황 조회 완료",
                attendanceService.getOwnerAttendance(storeId, loginUserId, workDate)));
    }
}
