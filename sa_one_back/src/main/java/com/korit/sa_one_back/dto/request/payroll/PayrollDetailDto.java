package com.korit.sa_one_back.dto.request.payroll;

import com.korit.sa_one_back.entity.payroll.PayrollDetailEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PayrollDetailDto {
    private String itemCode;
    private int amount;

    private Integer minutes;
    private Double quantity;
    private Integer unitPrice;
    private Double multiplier;
    private String memo;

    public PayrollDetailEntity toEntity(Long payrollId, Long payrollItemId) {
        return PayrollDetailEntity.builder()
                .payrollId(payrollId)
                .payrollItemId(payrollItemId)
                .amount(amount)
                .minutes(minutes)
                .quantity(quantity)
                .unitPrice(unitPrice)
                .multiplier(multiplier)
                .memo(memo)
                .build();
    }
}
