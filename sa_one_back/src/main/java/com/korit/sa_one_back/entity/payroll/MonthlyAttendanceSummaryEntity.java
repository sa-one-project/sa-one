package com.korit.sa_one_back.entity.payroll;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyAttendanceSummaryEntity {
    private Long summaryId;
    private Long storeEmployeeId;
    private String payslipYearMonth;

    private int workDays;
    private int totalWorkMinutes;
    private int totalOvertimeMinutes;
    private int totalNightMinutes;

    private int lateCount;
    private int earlyLeaveCount;
    private int absentCount;
    private int leaveDays;

    private LocalDateTime createdAt;
}
