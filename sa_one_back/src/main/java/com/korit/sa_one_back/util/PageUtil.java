package com.korit.sa_one_back.util;

public class PageUtil {

    private PageUtil() {}

    public static PageParam resolve(Integer page, Integer size) {
        int p = (page == null || page < 1) ? 1 : page;
        int s = (size == null || size < 1) ? 20 : size;
        int offset = (p - 1) * s;

        return new PageParam(p, s, offset);
    }
}
