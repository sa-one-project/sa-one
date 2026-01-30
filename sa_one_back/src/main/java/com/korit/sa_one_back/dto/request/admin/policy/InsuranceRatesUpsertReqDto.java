package com.korit.sa_one_back.dto.request.admin.policy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceRatesUpsertReqDto {
    private List<InsuranceRateUpsertItemDto> items;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InsuranceRateUpsertItemDto {
        private Long insuranceId;
        private String employeeRate;
        private String employerRate;
        private String totalRate;
        private String note;
    }
}
