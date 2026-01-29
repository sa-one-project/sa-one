package com.korit.sa_one_back.entity;

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
public class ScheduleEntity {
    private Long scheduleId;
    private Long storeEmployeeId;

    private LocalDate workDate;
    private LocalTime startTime;
    private LocalTime endTime;

    private Integer breakMinutes;
    private String note;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
