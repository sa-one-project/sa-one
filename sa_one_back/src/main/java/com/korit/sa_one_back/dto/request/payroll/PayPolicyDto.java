package com.korit.sa_one_back.dto.request.payroll;

import lombok.Data;

@Data
public class PayPolicyDto {
    private boolean weeklyAllowanceYn;
    private double overtimeMultiplier;
    private double nightMultiplier;
}
