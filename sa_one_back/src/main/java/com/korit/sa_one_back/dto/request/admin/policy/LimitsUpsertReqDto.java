package com.korit.sa_one_back.dto.request.admin.policy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LimitsUpsertReqDto {
    private Integer nationalPensionLower;
    private Integer nationalPensionUpper;
    private Integer healthInsuranceLower;
    private Integer healthInsuranceUpper;
}
