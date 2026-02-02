package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.response.CalendarRowRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface OwnerCalendarMapper {

    // 사장 월 캘린더(전체) row 조회
    List<CalendarRowRespDto> findOwnerMonthRows(
            @Param("storeId") Long storeId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

    // 사장 -> 직원 개인 월 캘린더 row 조회
    List<CalendarRowRespDto> findOwnerEmployeeMonthRows(
            @Param("storeId") Long storeId,
            @Param("storeEmployeeId") Long storeEmployeeId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );
}
