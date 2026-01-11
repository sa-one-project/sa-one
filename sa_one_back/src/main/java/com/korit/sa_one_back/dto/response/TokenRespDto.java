package com.korit.sa_one_back.dto.response;

import com.korit.sa_one_back.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenRespDto {

    private String accessToken;
    private UserEntity user;
}
