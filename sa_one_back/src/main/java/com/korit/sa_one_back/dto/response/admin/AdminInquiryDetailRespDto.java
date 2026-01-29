package com.korit.sa_one_back.dto.response.admin;

import com.korit.sa_one_back.entity.inquiry.InquiryCommentEntity;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminInquiryDetailRespDto {
    private Long inquiryId;
    private String title;
    private String content;
    private String status;

    private Long userId;
    private String userName;
    private String userEmail;

    private Long storeId;
    private String storeName;

    private String createdAt;
    private String reviewedAt;

    private List<InquiryCommentEntity> comments;
}
