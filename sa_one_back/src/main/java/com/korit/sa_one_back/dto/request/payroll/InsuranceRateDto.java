package com.korit.sa_one_back.dto.request.payroll;

import lombok.Data;

@Data
public class InsuranceRateDto {
    private double employeeRate;
    private double employerRate;
    private double totalRate;
}
