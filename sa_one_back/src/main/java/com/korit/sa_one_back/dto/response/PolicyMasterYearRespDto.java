package com.korit.sa_one_back.dto.response;

import com.korit.sa_one_back.entity.payroll.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PolicyMasterYearRespDto {
    private int year;

    private TaxRateEntity taxRate;
    private MinimumWageEntity minimumWage;

    private NationalPensionLimitEntity nationalPensionLimit;
    private HealthInsuranceLimitEntity healthInsuranceLimit;

    private List<InsuranceRateEntity> insuranceRates;
    private List<EmploymentCompanyRateEntity> employmentCompanyRates;
    private List<IndustrialAccidentRateEntity> industrialAccidentRates;
}
