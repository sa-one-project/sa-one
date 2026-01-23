package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeListRespDto {

    // store_employee_tb
    private Long storeEmployeeId;
    private Long storeId;
    private Long userId;
    private String employeeNo;
    private Long positionId;
    private LocalDate joinDate;
    private String workStatus;

    // user_tb
    private String name;
    private String email;
    private String phone;
    private String imgUrl;
    private String imgPath;
    private LocalDate birthDate;

    // position_tb
    private String positionName;

    // pay_tb
    private String payType;
    private Integer hourlyRate;
    private Integer monthlySalary;
    private LocalDate startDate;
    private LocalDate endDate;
}
