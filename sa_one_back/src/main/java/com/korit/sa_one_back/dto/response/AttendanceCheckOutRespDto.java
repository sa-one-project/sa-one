package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceCheckOutRespDto {

    private Long attendanceId;
    private Long storeId;
    private Long storeEmployeeId;
    private String employeeName;
    private LocalDateTime checkOutTime;
    private Integer workedMinutes;
}
