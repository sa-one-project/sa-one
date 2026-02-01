package com.korit.sa_one_back.dto.request.inquiry;

import lombok.Data;

@Data
public class InquiryCreateReqDto {
    private Long storeId;
    private String title;
    private String content;
}