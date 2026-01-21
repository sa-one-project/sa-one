package com.korit.sa_one_back.dto.request.payroll;

import lombok.Data;

@Data
public class MonthlyAttendanceSummaryDto {
    private Long storeEmployeeId;
    private String payslipYearMonth;

    private int workDays;
    private int totalWorkMinutes;
    private int totalOvertimeMinutes;
    private int totalNightMinutes;
}
