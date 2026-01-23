package com.korit.sa_one_back.entity.payroll;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceRateEntity {
    private String insuranceCode;
    private int year;

    private double employeeRate;
    private double employerRate;
    private double totalRate;

    private String note;
}
