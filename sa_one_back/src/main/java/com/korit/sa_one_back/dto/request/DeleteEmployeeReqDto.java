package com.korit.sa_one_back.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class DeleteEmployeeReqDto {

    private List<Long> storeEmployeeId;

}
