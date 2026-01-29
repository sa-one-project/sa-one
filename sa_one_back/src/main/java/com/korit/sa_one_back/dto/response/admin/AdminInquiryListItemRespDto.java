package com.korit.sa_one_back.dto.response.admin;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminInquiryListItemRespDto {
    private Long inquiryId;
    private String title;
    private String status;
    private String userName;
    private Long userId;
    private String storeName;
    private String createdAt;
}
