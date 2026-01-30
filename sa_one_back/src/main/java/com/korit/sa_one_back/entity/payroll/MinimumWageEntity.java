package com.korit.sa_one_back.entity.payroll;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MinimumWageEntity {
    private Long minimumWageId;
    private Integer year;
    private Integer hourlyWage;
    private LocalDate effectiveFrom;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
