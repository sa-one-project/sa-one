package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/*
- 사장이 보는 "직원 캘린더" 최종 응답 DTO
*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerCalendarRespDto {
    // 사장이 "가게 캘린더 전체"를 볼 때 응답
    private Long storeId;
    private String storeName;

    // 날짜별로 직원 리스트가 묶여서 내려감
    private List<CalendarDayRespDto> items;
}