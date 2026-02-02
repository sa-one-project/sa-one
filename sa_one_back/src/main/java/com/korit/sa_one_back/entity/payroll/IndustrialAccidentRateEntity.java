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
public class IndustrialAccidentRateEntity {
    private Long industrialRateId;
    private String industryCode;
    private Integer year;
    private BigDecimal employerRate;
}
