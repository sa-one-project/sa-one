package com.korit.sa_one_back.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageParam {
    private int page;
    private int size;
    private int offset;
}
