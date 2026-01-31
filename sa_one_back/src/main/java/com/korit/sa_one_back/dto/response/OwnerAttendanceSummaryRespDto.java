package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerAttendanceSummaryRespDto {
    private String storeName;
    private String storeAddress;
    private String storeIntro;
    private String storeHoliday;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    private Integer totalCheckInCount;
    private List<String> checkInEmployeeNames;
    private Integer totalAbsentCount;
    private List<OwnerAbsentEmployeeRespDto> absentEmployees;
    private List<OwnerAttendanceRespDto> items;
}
