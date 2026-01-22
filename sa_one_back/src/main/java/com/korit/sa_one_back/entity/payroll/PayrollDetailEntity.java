package com.korit.sa_one_back.entity.payroll;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PayrollDetailEntity {
    private Long payrollDetailId;
    private Long payrollId;
    private Long payrollItemId;

    private int amount;

    private Integer minutes;
    private Double quantity;
    private Integer unitPrice;
    private Double multiplier;
    private String memo;
}
