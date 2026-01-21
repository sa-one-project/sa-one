package com.korit.sa_one_back.dto.request.payroll;

import lombok.Data;

@Data
public class LimitDto {
    private int lowerLimit;
    private int upperLimit;
}
