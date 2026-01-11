package com.korit.sa_one_back.dto.request;

import lombok.Data;

@Data
public class SignUpReqDto {

    private int roleId;
    private String username;
    private String password;
    private String name;
    private String phone;
    private String email;
    private String imgUrl;
    private String imgPath;

}
