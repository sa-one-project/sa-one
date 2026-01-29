package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeCalendarRespDto {

    private Long storeId;
    private String storeName;

    private Long storeEmployeeId;
    private Long userId;
    private String name;

    // 요약(월 캘린더 hover용)
    private LocalTime startTime;
    private LocalTime endTime;
    private String note;

    // 출결 연동(팝업 또는 hover에 표시 가능)
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private String attendanceStatus;

    // 휴가/결근 표시
    private LeaveInfoRespDto leave;

    // 사장 -> 직원 개인 캘린더 상세보기에서만 사용
    private List<EmployeeCalendarItemRespDto> items;
}
