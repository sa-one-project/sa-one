package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.entity.AttendanceEntity;
import lombok.Data;

import java.time.LocalDateTime;


@Data
public class AttendanceCheckOutReqDto {

    private Long storeId;
    private String storeEmployeeName;
    private String employeeNo;

    private LocalDateTime checkOutTime;
    private String checkOutImgUrl;

    public AttendanceEntity toEntity(Long attendanceId, int workMinutes) {
        return AttendanceEntity.builder()
                .attendanceId(attendanceId)
                .checkOutTime(checkOutTime)
                .checkOutImgUrl(checkOutImgUrl)
                .workMinutes(workMinutes)
                .attendanceStatus("DONE")
                .build();
    }
}
