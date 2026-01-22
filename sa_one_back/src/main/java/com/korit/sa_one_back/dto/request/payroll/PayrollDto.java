package com.korit.sa_one_back.dto.request.payroll;

import com.korit.sa_one_back.entity.payroll.PayrollEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class PayrollDto {

    private Long storeEmployeeId;
    private String payslipYearMonth;

    private LocalDate periodStart;
    private LocalDate periodEnd;
    private LocalDate payDate; // nullable

    private String status; // "DRAFT" / "ISSUED" / "CONFIRMED"

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
    private LocalDateTime issuedAt;
    private LocalDateTime confirmedAt;

    public PayrollEntity toEntity() {
        return PayrollEntity.builder()
                .storeEmployeeId(storeEmployeeId)
                .payslipYearMonth(payslipYearMonth)
                .periodStart(periodStart)
                .periodEnd(periodEnd)
                .payDate(payDate)
                .status(status)

                .weeklyAllowanceYn(weeklyAllowanceYn)
                .overtimeMultiplier(overtimeMultiplier)
                .nightMultiplier(nightMultiplier)

                .totalWorkMinutes(totalWorkMinutes)
                .totalOvertimeMinutes(totalOvertimeMinutes)
                .totalNightMinutes(totalNightMinutes)

                .grossPay(grossPay)
                .totalDeduction(totalDeduction)
                .netPay(netPay)

                .incomeTaxRate(incomeTaxRate)
                .localTaxRate(localTaxRate)
                .nationalPensionRate(nationalPensionRate)
                .healthInsuranceRate(healthInsuranceRate)
                .employmentInsuranceRate(employmentInsuranceRate)

                .industrialAccidentInsurance(industrialAccidentInsurance)

                .issuedAt(issuedAt)
                .confirmedAt(confirmedAt)
                .build();
    }
}
