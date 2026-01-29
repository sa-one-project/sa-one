package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.response.*;
import com.korit.sa_one_back.mapper.OwnerCalendarMapper;
import com.korit.sa_one_back.mapper.ScheduleMapper;
import com.korit.sa_one_back.mapper.StoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

/*
    사장 캘린더 관련 서비스

    핵심 알고리즘
    1) 사장 권한/가게 소유권 검증
    2) year/month로 해당 월의 start/end 생성
    3) MyBatis row 리스트 조회 (schedule/attendance/leave 조인)
    4) row들을 workDate 기준으로 묶기
    5) 날짜별 employees 리스트를 만들어 OwnerCalendarRespDto 구성
*/
@Service
@RequiredArgsConstructor
public class OwnerCalendarService {

    private final StoreMapper storeMapper;
    private final OwnerCalendarMapper ownerCalendarMapper;
    private final ScheduleMapper scheduleMapper;

    private void validateOwner(Long storeId, Long userId, String role) {
        if (!"ROLE_OWNER".equals(role)) {
            throw new RuntimeException("FORBIDDEN_OWNER_ONLY");
        }
        if (storeMapper.countByStoreId(storeId) == 0) {
            throw new RuntimeException("STORE_NOT_FOUND");
        }
        Long ownerUserId = storeMapper.findOwnerUserId(storeId);
        if (ownerUserId == null || !ownerUserId.equals(userId)) {
            throw new RuntimeException("FORBIDDEN_STORE_ACCESS");
        }
    }

    public OwnerCalendarRespDto getOwnerMonth(Long storeId, int year, int month, Long userId, String role) {
        validateOwner(storeId, userId, role);

        YearMonth ym = YearMonth.of(year, month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        List<CalendarRowRespDto> rows = ownerCalendarMapper.findOwnerMonthRows(storeId, start, end);

        // 1) 날짜별로 묶기
        Map<LocalDate, List<CalendarRowRespDto>> byDate = new LinkedHashMap<>();
        for (CalendarRowRespDto r : rows) {
            // schedule이 없는 직원은 work_date가 null일 수 있음
            // 월 캘린더에 표시할 "기준 날짜"가 없으니 제외(원하면 정책 바꿀 수 있음)
            if (r.getWorkDate() == null) continue;

            byDate.computeIfAbsent(r.getWorkDate(), k -> new ArrayList<>()).add(r);
        }

        // 2) 날짜별 응답 DTO 구성
        List<CalendarDayRespDto> items = new ArrayList<>();
        for (Map.Entry<LocalDate, List<CalendarRowRespDto>> entry : byDate.entrySet()) {
            LocalDate workDate = entry.getKey();
            List<CalendarRowRespDto> dayRows = entry.getValue();

            List<EmployeeCalendarRespDto> employees = new ArrayList<>();
            for (CalendarRowRespDto r : dayRows) {
                employees.add(buildEmployeeSummary(r));
            }

            items.add(CalendarDayRespDto.builder()
                    .workDate(workDate)
//                    .items(employees)
                    .build());
        }

        String storeName = rows.isEmpty() ? null : rows.get(0).getStoreName();
        return OwnerCalendarRespDto.builder()
                .storeId(storeId)
                .storeName(storeName)
                .items(items)
                .build();
    }

    // 사장 -> 직원 개인 캘린더 상세(월)
    public EmployeeCalendarRespDto getOwnerEmployeeMonth(Long storeId, Long storeEmployeeId,
                                                         int year, int month,
                                                         Long userId, String role) {
        validateOwner(storeId, userId, role);

        if (scheduleMapper.countStoreEmployeeInStore(storeId, storeEmployeeId) == 0) {
            throw new RuntimeException("STORE_EMPLOYEE_NOT_FOUND");
        }

        YearMonth ym = YearMonth.of(year, month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        List<CalendarRowRespDto> rows =
                ownerCalendarMapper.findOwnerEmployeeMonthRows(storeId, storeEmployeeId, start, end);

        // 직원 정보는 rows 첫 줄에서 가져옴(없으면 가게에 직원은 있는데 해당 월 일정이 없을 수 있음)
        Long userIdFromRow = rows.isEmpty() ? null : rows.get(0).getUserId();
        String nameFromRow = rows.isEmpty() ? null : rows.get(0).getName();
        String storeName = rows.isEmpty() ? null : rows.get(0).getStoreName();

        List<EmployeeCalendarItemRespDto> items = new ArrayList<>();
        for (CalendarRowRespDto r : rows) {
            if (r.getWorkDate() == null) continue;

            items.add(EmployeeCalendarItemRespDto.builder()
                    .workDate(r.getWorkDate())
                    .scheduleId(r.getScheduleId())
                    .startTime(r.getStartTime())
                    .endTime(r.getEndTime())
                    .breakMinutes(r.getBreakMinutes())
                    .note(r.getScheduleNote())
                    .attendance(buildAttendance(r))
                    .leave(buildLeave(r))
                    .build());
        }

        return EmployeeCalendarRespDto.builder()
                .storeId(storeId)
                .storeName(storeName)
                .storeEmployeeId(storeEmployeeId)
                .userId(userIdFromRow)
                .name(nameFromRow)
                .items(items)
                .build();
    }

    private EmployeeCalendarRespDto buildEmployeeSummary(CalendarRowRespDto r) {
        return EmployeeCalendarRespDto.builder()
                .storeId(r.getStoreId())
                .storeName(r.getStoreName())
                .storeEmployeeId(r.getStoreEmployeeId())
                .userId(r.getUserId())
                .name(r.getName())
                .startTime(r.getStartTime())
                .endTime(r.getEndTime())
                .note(r.getScheduleNote())
                .checkInTime(r.getCheckInTime())
                .checkOutTime(r.getCheckOutTime())
                .attendanceStatus(r.getAttendanceStatus())
                .leave(buildLeave(r))
                .build();
    }

    private AttendanceInfoRespDto buildAttendance(CalendarRowRespDto r) {
        if (r.getAttendanceId() == null) return null;
        return AttendanceInfoRespDto.builder()
                .attendanceId(r.getAttendanceId())
                .checkInTime(r.getCheckInTime())
                .checkOutTime(r.getCheckOutTime())
                .workMinutes(r.getWorkMinutes())
                .attendanceStatus(r.getAttendanceStatus())
                .build();
    }

    private LeaveInfoRespDto buildLeave(CalendarRowRespDto r) {
        if (r.getLeaveId() == null) return null;
        return LeaveInfoRespDto.builder()
                .leaveId(r.getLeaveId())
                .leaveType(r.getLeaveType())
                .leaveTypeName(r.getLeaveTypeName())
                .build();
    }
}
