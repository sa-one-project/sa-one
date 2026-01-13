package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.entity.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;

@Data
public class SignUpReqDto {

    private int roleId;
    @Pattern(regexp = "^[a-z0-9_-]{5,20}$",
            message = "아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.")
    private String username;
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z0-9])[A-Za-z0-9^A-Za-z0-9\\W]{8,16}$",
            message = "비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.")
    private String password;
    private String name;
    private String phone;
    @Email
    @NotBlank
    private String email;
    private String imgUrl;
    private String imgPath;
    private String gender;
    private Date birthDate;
    private boolean isDeleted;

    public UserEntity toLocalEntity(BCryptPasswordEncoder passwordEncoder) {
        return UserEntity.builder()
                .roleId(roleId)
                .username(username)
                .password(passwordEncoder.encode(password))
                .name(name)
                .phone(phone)
                .email(email)
                .imgUrl(imgUrl)
                .imgPath(imgPath)
                .oauth2Id(null)
                .provider(null)
                .gender(gender)
                .birthDate(birthDate)
                .isDeleted(false)
                .build();
    }

}
