package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
    attendance_tb 결과 표시 DTO
*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceInfoRespDto {
    private Long attendanceId;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private Integer workMinutes;
    private String attendanceStatus;
}