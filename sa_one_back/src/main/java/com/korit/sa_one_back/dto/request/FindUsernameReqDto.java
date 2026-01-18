package com.korit.sa_one_back.dto.request;

import lombok.Data;

@Data
public class FindUsernameReqDto {
    private String name;
    private String email;
}
