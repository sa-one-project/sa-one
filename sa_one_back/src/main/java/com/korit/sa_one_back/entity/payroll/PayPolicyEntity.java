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
public class PayPolicyEntity {
    private Long payPolicyId;
    private Long storeId;

    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private boolean active;

    private boolean weeklyAllowanceYn;
    private double overtimeMultiplier;
    private double nightMultiplier;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
