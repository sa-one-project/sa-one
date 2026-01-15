package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.response.UserMeRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MyPageMapper {

    // ===== 직원 전용 =====
    UserMeRespDto.EmployeeInfo findEmployeeInfoByUserId(Long userId);

    // ===== 사장/매니저 전용 =====
    List<UserMeRespDto.StoreInfo> findMyStoreList(Long userId);
    Long findFirstStoreId(Long userId);

    UserMeRespDto.StoreInfo findMyStoreDetail(@Param("userId") Long userId,
                                              @Param("storeId") Long storeId);
}