package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.request.StoreApplicationReqDto;
import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.entity.StoreEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

@Mapper
public interface StoreMapper {

    StoreApplicationEntity selectByUserIdAndStoreApplicationId(@Param("storeApplicationId") Long storeApplicationId,
                                          @Param("userId") Long userId);
    StoreApplicationEntity selectByApplicationIdForAdmin(@Param("storeApplicationId") Long storeApplicationId);

    int insertStore(StoreEntity store);

    int updateApplicationStatus(@Param("storeApplicationId") Long storeApplicationId,
                                @Param("status") String status,
                                @Param("reviewedAt") LocalDateTime reviewedAt,
                                @Param("rejectReason") String rejectReason);
}
