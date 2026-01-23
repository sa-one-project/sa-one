package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.AttendanceCheckInReqDto;
import com.korit.sa_one_back.dto.request.AttendanceCheckOutReqDto;
import com.korit.sa_one_back.dto.response.AttendanceCheckInRespDto;
import com.korit.sa_one_back.dto.response.AttendanceCheckOutRespDto;
import com.korit.sa_one_back.entity.AttendanceEntity;
import com.korit.sa_one_back.mapper.AttendanceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceMapper attendanceMapper;

    public AttendanceCheckInRespDto checkIn(Long userId, AttendanceCheckInReqDto reqDto) {

        Long storeEmployeeId =
                attendanceMapper.findStoreEmployeeId(userId, reqDto.getStoreId());
        if (storeEmployeeId == null) throw new RuntimeException("직원 아님");

        LocalDate workDate = reqDto.getCheckInTime().toLocalDate();
        if (attendanceMapper.countTodayAttendance(storeEmployeeId, workDate) > 0)
            throw new RuntimeException("이미 출근");

        AttendanceEntity entity = reqDto.toEntity(storeEmployeeId);
        attendanceMapper.insertCheckIn(entity);

        return AttendanceCheckInRespDto.builder()
                .attendanceId(entity.getAttendanceId())
                .storeId(reqDto.getStoreId())
                .checkInTime(reqDto.getCheckInTime())
                .build();
    }

    public AttendanceCheckOutRespDto checkOut(Long userId, AttendanceCheckOutReqDto reqDto) {

        Long storeEmployeeId =
                attendanceMapper.findStoreEmployeeId(userId, reqDto.getStoreId());
        if (storeEmployeeId == null) throw new RuntimeException("직원 아님");

        AttendanceEntity today =
                attendanceMapper.findTodayAttendanceForCheckOut(
                        storeEmployeeId, reqDto.getCheckOutTime().toLocalDate());

        if (today == null || today.getCheckInTime() == null)
            throw new RuntimeException("출근 기록 없음");

        int minutes = (int) Duration
                .between(today.getCheckInTime(), reqDto.getCheckOutTime()).toMinutes();

        attendanceMapper.updateCheckOut(
                AttendanceEntity.builder()
                        .attendanceId(today.getAttendanceId())
                        .checkOutTime(reqDto.getCheckOutTime())
                        .checkOutImgUrl(reqDto.getCheckOutImgUrl())
                        .workMinutes(minutes)
                        .attendanceStatus("DONE")
                        .build()
        );

        return AttendanceCheckOutRespDto.builder()
                .attendanceId(today.getAttendanceId())
                .storeId(reqDto.getStoreId())
                .checkOutTime(reqDto.getCheckOutTime())
                .workedMinutes(minutes)
                .build();
    }
}
