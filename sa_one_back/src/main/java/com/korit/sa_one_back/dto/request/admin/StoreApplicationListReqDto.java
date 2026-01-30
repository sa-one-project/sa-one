package com.korit.sa_one_back.dto.request.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreApplicationListReqDto {
    private String status;
    private Integer page;
    private Integer size;
}
