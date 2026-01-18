package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.entity.StoreEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

@Mapper
public interface StoreMapper {

    int insertStoreApplication(StoreApplicationEntity entity);

    StoreApplicationEntity selectByUserId(Long userId);

    StoreApplicationEntity selectByApplicationIdForAdmin(Long storeApplicationId);

    int insertStore(StoreEntity store);

    int updateApplicationStatus(@Param("storeApplicationId") Long storeApplicationId,
                                @Param("status") String status,
                                @Param("reviewedAt") LocalDateTime reviewedAt,
                                @Param("rejectReason") String rejectReason);
  
    int countByStoreId(@Param("storeId") Long storeId);
    Long findOwnerUserId(@Param("storeId") Long storeId);
}