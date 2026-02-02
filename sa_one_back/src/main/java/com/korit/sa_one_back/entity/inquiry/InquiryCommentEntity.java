package com.korit.sa_one_back.entity.inquiry;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquiryCommentEntity {
    private Long commentId;
    private Long inquiryId;
    private Long userId;
    private String content;
    private String createdAt;
    private String updatedAt;
}