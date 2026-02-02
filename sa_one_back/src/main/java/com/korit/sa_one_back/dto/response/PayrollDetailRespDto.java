package com.korit.sa_one_back.dto.response;

import com.korit.sa_one_back.entity.payroll.PayrollEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PayrollDetailRespDto {
    private PayrollEntity payroll;
    private List<PayrollDetailViewRespDto> details;
}
