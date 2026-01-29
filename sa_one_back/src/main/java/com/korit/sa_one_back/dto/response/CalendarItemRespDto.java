package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarItemRespDto {

    private Long storeEmployeeId;
    private String name;

    private Long scheduleId;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer breakMinutes;
    private String note;

    // SCHEDULED / NONE
    private String status;
}
