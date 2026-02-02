package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.dto.response.CalendarDayRespDto;
import com.korit.sa_one_back.dto.response.CalendarItemRespDto;
import com.korit.sa_one_back.dto.response.CalendarRowRespDto;
import com.korit.sa_one_back.dto.response.OwnerCalendarRespDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class builderCalendar {
    private OwnerCalendarRespDto buildOwnerCalendar(List<CalendarRowRespDto> rows) {

        // 스케줄이 하나도 없는 경우
        if (rows == null || rows.isEmpty()) {
            return OwnerCalendarRespDto.builder()
                    .storeId(null)
                    .storeName(null)
                    .items(List.of())
                    .build();
        }

        Long storeId = rows.get(0).getStoreId();
        String storeName = rows.get(0).getStoreName();

        Map<LocalDate, List<CalendarItemRespDto>> grouped = new LinkedHashMap<>();

        for (CalendarRowRespDto row : rows) {

            // left join 결과라 날짜가 null일 수 있음
            if (row.getWorkDate() == null) continue;

            grouped.putIfAbsent(row.getWorkDate(), new ArrayList<>());

            grouped.get(row.getWorkDate()).add(
                    CalendarItemRespDto.builder()
                            .storeEmployeeId(row.getStoreEmployeeId())
                            .name(row.getName())
                            .scheduleId(row.getScheduleId())
                            .startTime(row.getStartTime())
                            .endTime(row.getEndTime())
                            .breakMinutes(row.getBreakMinutes())
//                            .note(row.getNote())
                            .status(row.getScheduleId() != null ? "SCHEDULED" : "NONE")
                            .build()
            );
        }

        List<CalendarDayRespDto> days = new ArrayList<>();
        for (Map.Entry<LocalDate, List<CalendarItemRespDto>> entry : grouped.entrySet()) {
            days.add(
                    CalendarDayRespDto.builder()
                            .workDate(entry.getKey())
//                            .employees(entry.getValue())
                            .build()
            );
        }

        return OwnerCalendarRespDto.builder()
                .storeId(storeId)
                .storeName(storeName)
                .items(days)
                .build();
    }

}
