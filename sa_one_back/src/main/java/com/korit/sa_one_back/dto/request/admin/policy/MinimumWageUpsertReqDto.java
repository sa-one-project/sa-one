package com.korit.sa_one_back.dto.request.admin.policy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MinimumWageUpsertReqDto {
    private Integer hourlyWage;
    private LocalDate effectiveFrom;
}