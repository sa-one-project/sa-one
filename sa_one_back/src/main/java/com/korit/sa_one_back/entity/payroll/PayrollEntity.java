package com.korit.sa_one_back.entity.payroll;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PayrollEntity {
    private Long payrollId;
    private Long storeEmployeeId;

    private String payslipYearMonth;
    private LocalDate periodStart;
    private LocalDate periodEnd;
    private LocalDate payDate;

    private String status;

    private boolean weeklyAllowanceYn;
    private double overtimeMultiplier;
    private double nightMultiplier;

    private int totalWorkMinutes;
    private int totalOvertimeMinutes;
    private int totalNightMinutes;

    private int grossPay;
    private int totalDeduction;
    private int netPay;

    private Double incomeTaxRate;
    private Double localTaxRate;
    private Double nationalPensionRate;
    private Double healthInsuranceRate;
    private Double employmentInsuranceRate;

    private int industrialAccidentInsurance;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime issuedAt;
    private LocalDateTime confirmedAt;
}
