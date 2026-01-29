package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeCalendarItemRespDto {

    private LocalDate workDate;

    private Long scheduleId;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer breakMinutes;
    private String note;

    private AttendanceInfoRespDto attendance;
    private LeaveInfoRespDto leave;
}
