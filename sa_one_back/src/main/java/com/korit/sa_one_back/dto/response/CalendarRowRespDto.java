package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarRowRespDto {
    // - DB JOIN 결과 "한 줄(row)"을 그대로 담는 DTO
    //- Service에서 날짜별로 묶기 전 단계에서만 사용됨
    // store
    private Long storeId;
    private String storeName;

    // employee
    private Long storeEmployeeId;
    private Long userId;
    private String name;

    // schedule_tb
    private Long scheduleId;
    private LocalDate workDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer breakMinutes;
    private String scheduleNote; // schedule_tb.note

    // attendance_tb
    private Long attendanceId;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private Integer workMinutes;
    private String attendanceStatus; // attendance_tb.attendance_status
    private String attendanceNote;   // attendance_tb.attendance_note (없으면 null)

    // leave_tb + leave_type_tb
    private Long leaveId;
    private String leaveType;       // leave_type_tb.leave_type_name or code를 쓰고 싶으면 여기로
    private String leaveTypeName;   // 표시용 "휴가/연차/병가" 등


}
