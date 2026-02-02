package com.korit.sa_one_back.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDayRespDto {
    //- 캘린더의 "하루"를 표현하는 DTO
    //- 날짜 + 해당 날짜의 직원 목록
    private LocalDate workDate;

    private LocalTime startTime;
    private LocalTime endTime;
    private Integer breakMinutes;
    private String note;

    private Integer totalWorkMinutes; // attendance_tb.work_minutes (없으면 null)

    private AttendanceInfoRespDto attendance;
    private LeaveInfoRespDto leave;

    private List<EmployeeCalendarRespDto> items;
}
