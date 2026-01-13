package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.entity.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;

@Data
public class OAuth2SignUpReqDto {

    private String oauth2Id;
    private String provider;
    private String name;
    private String phone;
    @Email
    @NotBlank
    private String email;
    private String imgUrl;
    private String imgPath;

    private String tempToken;
    private int roleId;
    private String gender;
    private Date birthDate;
    private boolean isDeleted;

    public UserEntity toOauth2Entity() {
        return UserEntity.builder()
                .roleId(roleId)
                .username(null)
                .password(null)
                .name(name)
                .phone(phone)
                .email(email)
                .imgUrl(imgUrl)
                .imgPath(imgPath)
                .oauth2Id(oauth2Id)
                .provider(provider)
                .gender(gender)
                .birthDate(birthDate)
                .isDeleted(false)
                .build();
    }
}
