package com.korit.sa_one_back.dto.response.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageRespDto<T> {
    private List<T> items;
    private int page;   // 1-base
    private int size;
    private int total;
}
