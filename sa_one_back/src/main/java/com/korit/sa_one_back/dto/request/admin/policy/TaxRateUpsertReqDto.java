package com.korit.sa_one_back.dto.request.admin.policy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaxRateUpsertReqDto {
    private String incomeTaxRate;
    private String localTaxRate;
}
