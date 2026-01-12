package com.korit.sa_one_back.dto.request;

import lombok.Data;

@Data
public class OAuth2SignUpReqDto {

    private String oauth2Id;
    private String provider;
    private String name;
    private String email;
    private String imgUrl;

    private String tempToken;
    private int roleId;
}
