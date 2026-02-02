package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.response.CalendarRowRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface OwnerAttendanceMapper {

    List<CalendarRowRespDto> findOwnerDayAttendanceRows(
            @Param("storeId") Long storeId,
            @Param("workDate") LocalDate workDate
    );
}
