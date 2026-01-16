package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.request.StoreApplicationReqDto;
import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.entity.StoreEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface StoreMapper {

    StoreApplicationEntity selectByUserId(@Param("id") Long userId);
    StoreApplicationEntity selectByApplicationIdForAdmin(@Param("id") Long userId);

    int insertStore(StoreEntity store);
    int updateApplicationStatus(StoreApplicationEntity application);
}
