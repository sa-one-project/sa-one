package com.korit.sa_one_back.entity.payroll;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NationalPensionLimitEntity {
    private Long nationalPensionLimitId;
    private Integer year;
    private Integer lowerLimit;
    private Integer upperLimit;
}
