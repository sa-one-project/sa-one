package com.korit.sa_one_back.dto.response.inquiry;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerInquiryListItemRespDto {
    private Long inquiryId;
    private String title;
    private String content;
    private String status;
    private String storeName;
    private String createdAt;
}