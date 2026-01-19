package com.korit.sa_one_back.dto.request;

import lombok.Data;

@Data
public class PasswordResetConfirmReqDto {
    private String token;
    private String newPassword;
    private String newPasswordConfirm;
}
