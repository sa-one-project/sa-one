package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.entity.MyStoreEntity;
import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.entity.StoreEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

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

    List<MyStoreEntity> findMyStoresByUserId(Long userId);

    // 사장 소유 매장 목록 (사장 캘린더/가게 선택용)
    List<MyStoreEntity> findOwnerStoresByUserId(Long userId);

    // 매장명 단건 조회 (캘린더 응답 보조용)
    String findStoreName(@Param("storeId") Long storeId);
    // 기존 그대로 두고 아래 2개만 추가
    int countEmployeeInStoreByUserId(@Param("storeId") Long storeId, @Param("userId") Long userId);



}