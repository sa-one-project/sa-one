package com.korit.sa_one_back.dto.response;

import lombok.Data;

@Data
public class PayrollDetailViewRespDto {
    private Long payrollDetailId;
    private Long payrollId;
    private Long payrollItemId;

    private String itemName;
    private String itemType;
    private Boolean taxable;

    private Integer amount;
    private Integer minutes;
    private Integer unitPrice;
    private Double multiplier;
    private String memo;
}
