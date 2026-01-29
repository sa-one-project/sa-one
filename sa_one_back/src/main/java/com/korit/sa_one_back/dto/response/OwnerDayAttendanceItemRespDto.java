package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

/*
    날짜별 출근 현황 팝업의 "직원 1명 row"
*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerDayAttendanceItemRespDto {
    private Long storeEmployeeId;
    private Long userId;
    private String name;

    // 원래 스케줄
    private LocalTime startTime;
    private LocalTime endTime;

    // 실제 출근/퇴근
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;

    private String attendanceStatus;

    private LeaveInfoRespDto leave;
}
