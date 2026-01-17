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
public class StoreEmployeeEntity {
    private Long storeEmployeeId;

    private Long storeId;
    private Long userId;

    private String employeeNo;
    private Long positionId;
    private LocalDate joinDate;

    private String workStatus;
}
