package com.korit.sa_one_back.entity.payroll;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmploymentCompanyRateEntity {
    private Long companyRateId;
    private Integer year;
    private String companyType;
    private BigDecimal employerRate;
}
