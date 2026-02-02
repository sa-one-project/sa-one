package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.response.CalendarRowRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface MyCalendarMapper {

    // 직원 본인 + store 기준 월 캘린더 row 조회
    List<CalendarRowRespDto> findMyMonthRows(
            @Param("storeId") Long storeId,
            @Param("userId") Long userId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

    // 직원이 해당 store에서 근무중인지 확인용
    int countMyStoreEmployee(@Param("storeId") Long storeId,
                             @Param("userId") Long userId);
}
