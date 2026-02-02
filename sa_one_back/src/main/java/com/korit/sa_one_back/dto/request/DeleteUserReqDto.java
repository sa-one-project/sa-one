package com.korit.sa_one_back.dto.request;

import lombok.Data;

@Data
public class DeleteUserReqDto {
    private String password;
    private String email;
}