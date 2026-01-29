package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeSimpleRespDto {
    // - 사장이 가게 선택 후 "직원 목록"을 볼 때 사용하는 DTO
    //- 직원 선택용 데이터만 담는다

    // store_employee_tb.store_employee_id
    private Long storeEmployeeId;

    // store_employee_tb.user_id
    private Long userId;

    // store_employee_tb.employee_no
    private String employeeNo;

    // user_tb.name
    private String name;
}
