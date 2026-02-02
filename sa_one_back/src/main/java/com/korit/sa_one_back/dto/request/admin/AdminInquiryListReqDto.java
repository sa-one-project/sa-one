package com.korit.sa_one_back.dto.request.admin;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminInquiryListReqDto {
    private String status;
    private String keyword;
    private Integer page;
    private Integer size;
}