package com.korit.sa_one_back.dto.request;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CreateEmployeeReqDto {

    private String name;
    private LocalDate birthDate;
    private String address;
    private String email;
    private String phone;

    private String imgUrl;
    private String imgPath;

    private String  employeeNo; // 사번 - store_employee_tb
    private LocalDate joinDate; // 입사일 - store_employee_tb
    private String positionName; // 고용형태 - position_tb

    // pay_tb
    private String payType; // 시급 또는 월급
    private int hourlyRate; // 시급
    private int monthlySalary; // 월급



}
