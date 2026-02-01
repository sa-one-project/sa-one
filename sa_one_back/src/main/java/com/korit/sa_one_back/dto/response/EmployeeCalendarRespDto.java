package com.korit.sa_one_back.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@JsonInclude(NON_NULL)
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
//    @JsonIgnore
    private LocalTime startTime;
//    @JsonIgnore
    private LocalTime endTime;
//    @JsonIgnore
    private String note;

    // 출결 연동(팝업 또는 hover에 표시 가능)
//    @JsonIgnore
    private LocalDateTime checkInTime;
//    @JsonIgnore
    private LocalDateTime checkOutTime;
//    @JsonIgnore
    private String attendanceStatus;

    // 휴가/결근 표시
//    @JsonIgnore
    private LeaveInfoRespDto leave;

    // 사장 -> 직원 개인 캘린더 상세보기에서만 사용
    private List<EmployeeCalendarItemRespDto> items;
}
