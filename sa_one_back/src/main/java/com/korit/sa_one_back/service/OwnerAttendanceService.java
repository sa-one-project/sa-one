package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.response.*;
import com.korit.sa_one_back.mapper.OwnerAttendanceMapper;
import com.korit.sa_one_back.mapper.StoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/*
    사장: 특정 날짜 클릭 -> 출근 현황 팝업 데이터 제공
*/
@Service
@RequiredArgsConstructor
public class OwnerAttendanceService {

    private final StoreMapper storeMapper;
    private final OwnerAttendanceMapper ownerAttendanceMapper;

    private void validateOwner(Long storeId, Long userId, String role) {
        if (!"ROLE_OWNER".equals(role)) throw new RuntimeException("FORBIDDEN_OWNER_ONLY");
        if (storeMapper.countByStoreId(storeId) == 0) throw new RuntimeException("STORE_NOT_FOUND");
        Long ownerUserId = storeMapper.findOwnerUserId(storeId);
        if (ownerUserId == null || !ownerUserId.equals(userId)) throw new RuntimeException("FORBIDDEN_STORE_ACCESS");
    }

    public OwnerDayAttendanceRespDto getDay(Long storeId, LocalDate workDate, Long userId, String role) {
        validateOwner(storeId, userId, role);

        List<CalendarRowRespDto> rows = ownerAttendanceMapper.findOwnerDayAttendanceRows(storeId, workDate);

        List<OwnerDayAttendanceItemRespDto> items = new ArrayList<>();
        for (CalendarRowRespDto r : rows) {
            items.add(OwnerDayAttendanceItemRespDto.builder()
                    .storeEmployeeId(r.getStoreEmployeeId())
                    .userId(r.getUserId())
                    .name(r.getName())
                    .startTime(r.getStartTime())
                    .endTime(r.getEndTime())
                    .checkInTime(r.getCheckInTime())
                    .checkOutTime(r.getCheckOutTime())
                    .attendanceStatus(r.getAttendanceStatus())
                    .leave(r.getLeaveId() == null ? null : LeaveInfoRespDto.builder()
                            .leaveId(r.getLeaveId())
                            .leaveTypeName(r.getLeaveTypeName())
                            .build())
                    .build());
        }

        String storeName = rows.isEmpty() ? null : rows.get(0).getStoreName();

        return OwnerDayAttendanceRespDto.builder()
                .storeId(storeId)
                .storeName(storeName)
                .workDate(workDate)
                .items(items)
                .build();
    }
}
