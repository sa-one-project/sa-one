package com.korit.sa_one_back.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AttendanceCheckOutReqDto {
    private Long storeId;
    private LocalDateTime checkOutTime;
    private String checkOutImgUrl;
}
