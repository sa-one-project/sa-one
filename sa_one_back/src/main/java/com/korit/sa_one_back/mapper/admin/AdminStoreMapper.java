package com.korit.sa_one_back.mapper.admin;

import com.korit.sa_one_back.dto.response.admin.AdminStoreDetailRespDto;
import com.korit.sa_one_back.dto.response.admin.AdminStoreListItemRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface AdminStoreMapper {

    int countStores(@Param("keyword") String keyword);

    List<AdminStoreListItemRespDto> findStores(
            @Param("keyword") String keyword,
            @Param("offset") int offset,
            @Param("size") int size
    );

    AdminStoreDetailRespDto findStoreDetail(@Param("storeId") Long storeId);
}