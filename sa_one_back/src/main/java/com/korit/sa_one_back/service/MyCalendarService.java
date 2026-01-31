package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.response.*;
import com.korit.sa_one_back.mapper.MyCalendarMapper;
import com.korit.sa_one_back.mapper.StoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

/*
    직원 본인 캘린더
    - 직원은 수정 불가, 조회만 가능
    - store를 선택해서 "해당 store에서의 내 근무 캘린더" 조회
*/
@Service
@RequiredArgsConstructor
public class MyCalendarService {

    private final StoreMapper storeMapper;
    private final MyCalendarMapper myCalendarMapper;

    private void validateStaff(Long storeId, Long userId, String role) {
        if (!"ROLE_STAFF".equals(role)) throw new RuntimeException("FORBIDDEN_STAFF_ONLY");
        if (storeMapper.countByStoreId(storeId) == 0) throw new RuntimeException("STORE_NOT_FOUND");
    }

    public MyCalendarRespDto getMyMonth(Long storeId, int year, int month, Long userId, String role) {
        validateStaff(storeId, userId, role);

        YearMonth ym = YearMonth.of(year, month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        List<CalendarRowRespDto> rows = myCalendarMapper.findMyMonthRows(storeId, userId, start, end);

        // 내 정보(직원명/스토어명/storeEmployeeId)는 row에서 꺼내기
        Long storeEmployeeId = rows.isEmpty() ? null : rows.get(0).getStoreEmployeeId();
        String name = rows.isEmpty() ? null : rows.get(0).getName();
        String storeName = rows.isEmpty() ? null : rows.get(0).getStoreName();

        List<CalendarDayRespDto> items = new ArrayList<>();
        for (CalendarRowRespDto r : rows) {
            if (r.getWorkDate() == null) continue;

            AttendanceInfoRespDto attendance = null;
            if (r.getAttendanceId() != null) {
                attendance = AttendanceInfoRespDto.builder()
                        .attendanceId(r.getAttendanceId())
                        .checkInTime(r.getCheckInTime())
                        .checkOutTime(r.getCheckOutTime())
                        .workMinutes(r.getWorkMinutes())
                        .attendanceStatus(r.getAttendanceStatus())
                        .build();
            }

            LeaveInfoRespDto leave = null;
            if (r.getLeaveId() != null) {
                leave = LeaveInfoRespDto.builder()
                        .leaveId(r.getLeaveId())
                        .leaveTypeName(r.getLeaveTypeName())
                        .build();
            }


            items.add(CalendarDayRespDto.builder()
                    .workDate(r.getWorkDate())
                    .startTime(r.getStartTime())
                    .endTime(r.getEndTime())
                    .breakMinutes(r.getBreakMinutes())
                    .note(r.getScheduleNote())
                    .totalWorkMinutes(r.getWorkMinutes())
                    .attendance(attendance)
                    .leave(leave)
                    .build());
        }

        return MyCalendarRespDto.builder()
                .storeId(storeId)
                .storeName(storeName)
                .storeEmployeeId(storeEmployeeId)
                .name(name)
                .items(items)
                .build();
    }
}
