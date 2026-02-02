package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.entity.ScheduleEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;

@Mapper
public interface ScheduleMapper {

    int insertSchedule(ScheduleEntity entity);

    int updateSchedule(ScheduleEntity entity);

    int deleteSchedule(@Param("scheduleId") Long scheduleId);

    // 이 scheduleId가 이 store 소속인지 검증 (사장 수정/삭제 보안용)
    int countScheduleInStore(@Param("storeId") Long storeId,
                             @Param("scheduleId") Long scheduleId);

    // 직원이 store에 속하는지 검증 (사장 상세조회/등록 시 사용)
    int countStoreEmployeeInStore(@Param("storeId") Long storeId,
                                  @Param("storeEmployeeId") Long storeEmployeeId);
}
