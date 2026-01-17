package com.korit.sa_one_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PayEntity {

    private Long payId;
    private Long storeEmployeeId;
    private String payType;
    private Integer hourlyRate;
    private Integer monthlySalary;

    private LocalDate startDate;
    private LocalDate endDate;
}
