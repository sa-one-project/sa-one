package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.entity.PayEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;

@Mapper
public interface PayMapper {
    int insertPay(PayEntity entity);

    int closeCurrentPayByEmployee(@Param("storeEmployeeId") Long storeEmployeeId,
                                  @Param("today") LocalDate today);
}
