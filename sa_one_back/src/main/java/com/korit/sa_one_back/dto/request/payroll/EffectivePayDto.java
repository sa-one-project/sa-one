package com.korit.sa_one_back.dto.request.payroll;

import lombok.Data;

@Data
public class EffectivePayDto {
    private String patType;
    private Integer hourlyRate;
    private Integer monthlySalary;
}
