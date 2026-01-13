package com.korit.sa_one_back.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SignInReqDto {


    @Pattern(regexp = "^[a-z0-9_-]{5,20}$",
            message = "아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.")
    private String username;
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z0-9])[A-Za-z0-9^A-Za-z0-9\\W]{8,16}$",
            message = "비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.")
    private String password;

}
