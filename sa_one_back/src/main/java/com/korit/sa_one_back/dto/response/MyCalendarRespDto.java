package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyCalendarRespDto {
    //- 직원 본인이 보는 "내 캘린더" 응답 DTO
    private Long storeId;
    private String storeName;

    private Long storeEmployeeId;
    private String name;

    private List<CalendarDayRespDto> items;

}
