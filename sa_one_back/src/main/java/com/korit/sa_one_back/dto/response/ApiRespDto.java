package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
    모든 API 응답을 { success, message, data } 형태로 통일하기 위한 Wrapper.
*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiRespDto<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> ApiRespDto<T> ok(String message, T data) {
        return ApiRespDto.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
    }

    public static <T> ApiRespDto<T> fail(String message, T data) {
        return ApiRespDto.<T>builder()
                .success(false)
                .message(message)
                .data(data)
                .build();
    }
}
