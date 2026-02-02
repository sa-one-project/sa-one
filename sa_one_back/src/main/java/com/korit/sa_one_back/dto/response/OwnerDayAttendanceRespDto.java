package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

/*
    사장이 캘린더 날짜를 클릭했을 때 뜨는 "출근 현황" 팝업 응답
*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerDayAttendanceRespDto {
    private Long storeId;
    private String storeName;
    private LocalDate workDate;

    private List<OwnerDayAttendanceItemRespDto> items;
}
