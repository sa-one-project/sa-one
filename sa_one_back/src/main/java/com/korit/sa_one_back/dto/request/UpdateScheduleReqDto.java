package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.entity.ScheduleEntity;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

/*

- 이미 존재하는 스케줄을 "수정"할 때 사용하는 요청 DTO
- PUT /stores/{storeId}/owner/schedules/{scheduleId}

*/
@Data
public class UpdateScheduleReqDto {

    private LocalDate workDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer breakMinutes;
    private String note;

    // 수정은 scheduleId가 반드시 있어야 해서, 여기서 같이 조립
    public ScheduleEntity toEntity(Long scheduleId) {
        return ScheduleEntity.builder()
                .scheduleId(scheduleId)
                .workDate(workDate)
                .startTime(startTime)
                .endTime(endTime)
                .breakMinutes(breakMinutes)
                .note(note)
                .build();
    }
}
