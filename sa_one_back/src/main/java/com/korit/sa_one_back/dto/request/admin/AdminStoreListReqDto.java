package com.korit.sa_one_back.dto.request.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStoreListReqDto {
    private String keyword;
    private Integer page;
    private Integer size;
}
