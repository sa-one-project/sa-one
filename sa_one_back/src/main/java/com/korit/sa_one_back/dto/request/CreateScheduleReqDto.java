package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.entity.ScheduleEntity;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

/*

- 사장이 "새 스케줄을 등록"할 때 사용하는 요청 DTO
- 아직 scheduleId가 없는 상태에서 사용됨
- POST /stores/{storeId}/owner/employees/{empId}/schedules

*/
@Data
public class CreateScheduleReqDto {

    // 근무 날짜
    private LocalDate workDate;

    // 출근 시간
    private LocalTime startTime;

    // 퇴근 시간
    private LocalTime endTime;

    // 휴게 시간(분 단위)
    private Integer breakMinutes;

    // 메모(사유 등)
    private String note;

    // Request DTO → Entity 변환
    public ScheduleEntity toEntity(Long storeEmployeeId) {
        return ScheduleEntity.builder()
                .storeEmployeeId(storeEmployeeId)
                .workDate(workDate)
                .startTime(startTime)
                .endTime(endTime)
                .breakMinutes(breakMinutes)
                .note(note)
                .build();
    }
}
