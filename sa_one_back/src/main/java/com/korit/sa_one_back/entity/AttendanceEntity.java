package com.korit.sa_one_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceEntity {

    private Long attendanceId;
    private Long storeEmployeeId;
    private LocalDate workDate;

    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;

    private String attendanceStatus;
    private int workMinutes;
    private int overtimeMinutes;
    private int nightMinutes;
    private int lateMinutes;
    private int earlyLeaveMinutes;

    private String checkInImgUrl;
    private String checkOutImgUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
