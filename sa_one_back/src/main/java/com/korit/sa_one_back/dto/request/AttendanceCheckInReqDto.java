package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.entity.AttendanceEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AttendanceCheckInReqDto {
    private Long storeId;
    private LocalDateTime checkInTime;
    private String checkInImgUrl;

    public com.korit.sa_one_back.entity.AttendanceEntity toEntity(Long storeEmployeeId) {
        return AttendanceEntity.builder()
                .storeEmployeeId(storeEmployeeId)
                .workDate(checkInTime.toLocalDate())
                .checkInTime(checkInTime)
                .checkInImgUrl(checkInImgUrl)
                .attendanceStatus("WORKING")
                .build();
    }
}
