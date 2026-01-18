package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.entity.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class OAuth2SignUpReqDto {

    private int roleId;
    private String username;
    private String password;
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
    private String gender;
    private LocalDate birthDate;
    private boolean isDeleted;

    public UserEntity toOauth2Entity(String password) {
        return UserEntity.builder()
                .roleId(roleId)
                .username(provider + "_" + oauth2Id.substring(0, 12))
                .password(password)
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
