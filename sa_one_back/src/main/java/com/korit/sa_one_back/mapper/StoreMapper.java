package com.korit.sa_one_back.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface StoreMapper {
    int countByStoreId(@Param("storeId") Long storeId);
    Long findOwnerUserId(@Param("storeId") Long storeId);
}