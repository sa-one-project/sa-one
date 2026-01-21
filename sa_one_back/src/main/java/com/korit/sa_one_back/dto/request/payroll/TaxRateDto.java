package com.korit.sa_one_back.dto.request.payroll;

import lombok.Data;

@Data
public class TaxRateDto {
    private double incomeTaxRate;
    private double localTaxRate;
}
