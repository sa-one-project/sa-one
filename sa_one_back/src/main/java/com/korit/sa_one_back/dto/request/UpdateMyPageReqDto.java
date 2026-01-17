package com.korit.sa_one_back.dto.request;

import lombok.Data;

@Data
public class UpdateMyPageReqDto {

    private String email;
    private String phone;
    private String imgUrl;

}
