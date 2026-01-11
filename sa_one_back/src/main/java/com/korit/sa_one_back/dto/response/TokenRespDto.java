package com.korit.sa_one_back.dto.response;

import com.korit.sa_one_back.entity.User;
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
    private User user;
}
