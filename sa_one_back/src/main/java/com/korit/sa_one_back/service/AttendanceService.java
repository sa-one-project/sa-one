//package com.korit.sa_one_back.service;
//
//import com.korit.sa_one_back.dto.request.AttendanceCheckInReqDto;
//import com.korit.sa_one_back.dto.request.AttendanceCheckOutReqDto;
//import com.korit.sa_one_back.dto.response.AttendanceCheckInRespDto;
//import com.korit.sa_one_back.dto.response.AttendanceCheckOutRespDto;
//import com.korit.sa_one_back.entity.AttendanceEntity;
//import com.korit.sa_one_back.mapper.AttendanceMapper;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.Duration;
//import java.time.LocalDate;
//
//@Service
//@RequiredArgsConstructor
//public class AttendanceService {
//
//    private final AttendanceMapper attendanceMapper;
//
//    public AttendanceCheckInRespDto checkIn(Long userId, AttendanceCheckInReqDto reqDto) {
//
//        Long storeEmployeeId =
//                attendanceMapper.findStoreEmployeeId(userId, reqDto.getStoreId());
//        if (storeEmployeeId == null) throw new RuntimeException("직원 아님");
//
//        LocalDate workDate = reqDto.getCheckInTime().toLocalDate();
//        if (attendanceMapper.countTodayAttendance(storeEmployeeId, workDate) > 0)
//            throw new RuntimeException("이미 출근");
//
//        AttendanceEntity entity = reqDto.toEntity(storeEmployeeId);
//        attendanceMapper.insertCheckIn(entity);
//
//        return AttendanceCheckInRespDto.builder()
//                .attendanceId(entity.getAttendanceId())
//                .storeId(reqDto.getStoreId())
//                .checkInTime(reqDto.getCheckInTime())
//                .build();
//    }
//
//    public AttendanceCheckOutRespDto checkOut(Long userId, AttendanceCheckOutReqDto reqDto) {
//
//        Long storeEmployeeId =
//                attendanceMapper.findStoreEmployeeId(userId, reqDto.getStoreId());
//        if (storeEmployeeId == null) throw new RuntimeException("직원 아님");
//
//        AttendanceEntity today =
//                attendanceMapper.findTodayAttendanceForCheckOut(
//                        storeEmployeeId, reqDto.getCheckOutTime().toLocalDate());
//
//        if (today == null || today.getCheckInTime() == null)
//            throw new RuntimeException("출근 기록 없음");
//
//        int minutes = (int) Duration
//                .between(today.getCheckInTime(), reqDto.getCheckOutTime()).toMinutes();
//
//        attendanceMapper.updateCheckOut(
//                AttendanceEntity.builder()
//                        .attendanceId(today.getAttendanceId())
//                        .checkOutTime(reqDto.getCheckOutTime())
//                        .checkOutImgUrl(reqDto.getCheckOutImgUrl())
//                        .workMinutes(minutes)
//                        .attendanceStatus("DONE")
//                        .build()
//        );
//
//        return AttendanceCheckOutRespDto.builder()
//                .attendanceId(today.getAttendanceId())
//                .storeId(reqDto.getStoreId())
//                .checkOutTime(reqDto.getCheckOutTime())
//                .workedMinutes(minutes)
//                .build();
//    }
//}

//package com.korit.sa_one_back.service;
//
//import com.korit.sa_one_back.dto.request.AttendanceCheckInReqDto;
//import com.korit.sa_one_back.dto.request.AttendanceCheckOutReqDto;
//import com.korit.sa_one_back.dto.response.AttendanceCheckInRespDto;
//import com.korit.sa_one_back.dto.response.AttendanceCheckOutRespDto;
//import com.korit.sa_one_back.dto.response.MyAttendanceRespDto;
//import com.korit.sa_one_back.dto.response.OwnerAttendanceRespDto;
//import com.korit.sa_one_back.entity.AttendanceEntity;
//import com.korit.sa_one_back.mapper.AttendanceMapper;
//import com.korit.sa_one_back.mapper.UserMapper;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.Duration;
//import java.time.LocalDate;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class AttendanceService {
//
//    private final AttendanceMapper attendanceMapper;
//    private final UserMapper userMapper;
//
//    /**
//     *  사장(OWNER) 로그인 상태에서 직원 선택 후 출근 처리
//     *
//     * [개발자 흐름]
//     * 1) 토큰 유저 roleId 확인 → OWNER만 가능
//     * 2) storeId가 "내 매장"인지 검증(countOwnerStore)
//     * 3) (storeId + 사번 + 이름)으로 storeEmployeeId 조회
//     * 4) 오늘 이미 출근했는지 중복 체크
//     * 5) 출근 insert (사진 URL 포함)
//     */
//    public AttendanceCheckInRespDto checkIn(Long ownerUserId, AttendanceCheckInReqDto reqDto) {
//
//        Long roleId = userMapper.findRoleIdByUserId(ownerUserId);
//        if (roleId == null) throw new RuntimeException("UNAUTHORIZED");
//
//        // OWNER = 1L, EMPLOYEE = 2L, ADMIN = 3L
//        if (roleId != 1L) throw new RuntimeException("FORBIDDEN_OWNER_ONLY");
//
//
//        //  사장 소유 매장인지 검증
//        if (attendanceMapper.countOwnerStore(reqDto.getStoreId(), ownerUserId) == 0) {
//            throw new RuntimeException("FORBIDDEN_WORKPLACE_ACCESS");
//        }
//
//        //  직원 선택(사번+이름)으로 storeEmployeeId 찾기
//        Long storeEmployeeId = attendanceMapper.findStoreEmployeeIdByNoAndName(
//                reqDto.getStoreId(),
//                reqDto.getEmployeeNo(),
//                reqDto.getStoreEmployeeName()
//        );
//        if (storeEmployeeId == null) throw new RuntimeException("EMPLOYEE_NOT_FOUND");
//
//        LocalDate workDate = reqDto.getCheckInTime().toLocalDate();
//        if (attendanceMapper.countTodayAttendance(storeEmployeeId, workDate) > 0) {
//            throw new RuntimeException("ALREADY_CHECKED_IN");
//        }
//
//        AttendanceEntity entity = reqDto.toEntity(storeEmployeeId);
//        attendanceMapper.insertCheckIn(entity);
//
//        // 응답용 이름(선택한 값 그대로 써도 되지만 DB 기준으로 맞추려면 조회)
//        String employeeName = attendanceMapper.findEmployeeName(storeEmployeeId);
//
//        return AttendanceCheckInRespDto.builder()
//                .attendanceId(entity.getAttendanceId())
//                .storeId(reqDto.getStoreId())
//                .storeEmployeeId(storeEmployeeId)
//                .employeeName(employeeName)
//                .checkInTime(reqDto.getCheckInTime())
//                .build();
//    }
//
//    /**
//     * 사장(OWNER) 로그인 상태에서 직원 선택 후 퇴근 처리
//     *
//     * [개발자 흐름]
//     * 1) OWNER 확인
//     * 2) 내 매장인지 확인
//     * 3) 직원 선택(사번+이름)으로 storeEmployeeId 조회
//     * 4) 오늘 출근 기록 가져오기
//     * 5) 근무시간 계산 후 update (퇴근 사진 URL 포함)
//     */
//    public AttendanceCheckOutRespDto checkOut(Long ownerUserId, AttendanceCheckOutReqDto reqDto) {
//
//        Integer roleId = userMapper.findRoleIdByUserId(ownerUserId);
//        if (roleId == null) throw new RuntimeException("UNAUTHORIZED");
//        if (roleId != 1) throw new RuntimeException("FORBIDDEN_OWNER_ONLY");
//
//        if (attendanceMapper.countOwnerStore(reqDto.getStoreId(), ownerUserId) == 0) {
//            throw new RuntimeException("FORBIDDEN_WORKPLACE_ACCESS");
//        }
//
//        Long storeEmployeeId = attendanceMapper.findStoreEmployeeIdByNoAndName(
//                reqDto.getStoreId(),
//                reqDto.getEmployeeNo(),
//                reqDto.getStoreEmployeeName()
//        );
//        if (storeEmployeeId == null) throw new RuntimeException("EMPLOYEE_NOT_FOUND");
//
//        LocalDate workDate = reqDto.getCheckOutTime().toLocalDate();
//
//        AttendanceEntity today = attendanceMapper.findTodayAttendanceForCheckOut(storeEmployeeId, workDate);
//        if (today == null || today.getCheckInTime() == null) {
//            throw new RuntimeException("NO_CHECK_IN_RECORD");
//        }
//
//        int minutes = (int) Duration.between(today.getCheckInTime(), reqDto.getCheckOutTime()).toMinutes();
//        if (minutes < 0) minutes = 0;
//
//        attendanceMapper.updateCheckOut(reqDto.toEntity(today.getAttendanceId(), minutes));
//
//        String employeeName = attendanceMapper.findEmployeeName(storeEmployeeId);
//
//        return AttendanceCheckOutRespDto.builder()
//                .attendanceId(today.getAttendanceId())
//                .storeId(reqDto.getStoreId())
//                .storeEmployeeId(storeEmployeeId)
//                .employeeName(employeeName)
//                .checkOutTime(reqDto.getCheckOutTime())
//                .workedMinutes(minutes)
//                .build();
//    }
//
//    /**
//     * 직원: 내 출결 조회 (직원 로그인 화면)
//     * - 이건 EMPLOYEE 로그인 기준 유지
//     * - 사장이 보는 페이지는 getOwnerAttendance로 처리
//     */
//    public List<MyAttendanceRespDto> getMyAttendances(Long userId, Long storeId) {
//
//        Integer roleId = userMapper.findRoleIdByUserId(userId);
//        if (roleId == null) throw new RuntimeException("UNAUTHORIZED");
//        if (roleId != 2) throw new RuntimeException("FORBIDDEN_EMPLOYEE_ONLY");
//
//        Long storeEmployeeId = attendanceMapper.findStoreEmployeeId(userId, storeId);
//        if (storeEmployeeId == null) throw new RuntimeException("FORBIDDEN_WORKPLACE_ACCESS");
//
//        return attendanceMapper.findMyAttendances(storeEmployeeId);
//    }
//
//    /**
//     *  사장: 매장 출근현황 조회
//     */
//    public Map<String, Object> getOwnerAttendance(Long storeId, Long ownerUserId, LocalDate workDate) {
//
//        Integer roleId = userMapper.findRoleIdByUserId(ownerUserId);
//        if (roleId == null) throw new RuntimeException("UNAUTHORIZED");
//        if (roleId != 1) throw new RuntimeException("FORBIDDEN_OWNER_ONLY");
//
//        if (attendanceMapper.countOwnerStore(storeId, ownerUserId) == 0) {
//            throw new RuntimeException("FORBIDDEN_WORKPLACE_ACCESS");
//        }
//
//        List<OwnerAttendanceRespDto> items = attendanceMapper.findOwnerAttendanceItems(storeId, workDate);
//
//        Map<String, Object> resp = new HashMap<>();
//        resp.put("storeCard", attendanceMapper.findStoreCard(storeId));
//        resp.put("openTime", attendanceMapper.findOpenTime(storeId, workDate));
//        resp.put("closeTime", attendanceMapper.findCloseTime(storeId, workDate));
//        resp.put("items", items);
//        return resp;
//    }
//}


package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.AttendanceCheckInReqDto;
import com.korit.sa_one_back.dto.request.AttendanceCheckOutReqDto;
import com.korit.sa_one_back.dto.response.AttendanceCheckInRespDto;
import com.korit.sa_one_back.dto.response.AttendanceCheckOutRespDto;
import com.korit.sa_one_back.dto.response.MyAttendanceRespDto;
import com.korit.sa_one_back.dto.response.OwnerAttendanceRespDto;
import com.korit.sa_one_back.entity.AttendanceEntity;
import com.korit.sa_one_back.mapper.AttendanceMapper;
import com.korit.sa_one_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceMapper attendanceMapper;
    private final UserMapper userMapper;

    /**
     * 사장 로그인 → 직원(사번+이름) 선택 → 출근 처리
     */
    public AttendanceCheckInRespDto checkIn(Long loginUserId, AttendanceCheckInReqDto reqDto) {

        int roleId = userMapper.findRoleIdByUserId(loginUserId);
        if (roleId != 2) throw new RuntimeException("FORBIDDEN_OWNER_ONLY");

        if (attendanceMapper.countOwnerStore(reqDto.getStoreId(), loginUserId) == 0) {
            throw new RuntimeException("FORBIDDEN_WORKPLACE_ACCESS");
        }

        Long storeEmployeeId = attendanceMapper.findStoreEmployeeIdByNoAndName(
                reqDto.getStoreId(),
                reqDto.getEmployeeNo(),
                reqDto.getStoreEmployeeName()
        );
        if (storeEmployeeId == null) throw new RuntimeException("EMPLOYEE_NOT_FOUND");

        LocalDate workDate = reqDto.getCheckInTime().toLocalDate();
        if (attendanceMapper.countTodayAttendance(storeEmployeeId, workDate) > 0) {
            throw new RuntimeException("ALREADY_CHECKED_IN");
        }

        AttendanceEntity entity = reqDto.toEntity(storeEmployeeId);
        attendanceMapper.insertCheckIn(entity);

        String employeeName = attendanceMapper.findEmployeeName(storeEmployeeId);

        return AttendanceCheckInRespDto.builder()
                .attendanceId(entity.getAttendanceId())
                .storeId(reqDto.getStoreId())
                .storeEmployeeId(storeEmployeeId)
                .employeeName(employeeName)
                .checkInTime(reqDto.getCheckInTime())
                .build();
    }

    /**
     * 사장 로그인 → 직원(사번+이름) 선택 → 퇴근 처리
     */
    public AttendanceCheckOutRespDto checkOut(Long loginUserId, AttendanceCheckOutReqDto reqDto) {

        int roleId = userMapper.findRoleIdByUserId(loginUserId);
        if (roleId != 2) throw new RuntimeException("FORBIDDEN_OWNER_ONLY");

        if (attendanceMapper.countOwnerStore(reqDto.getStoreId(), loginUserId) == 0) {
            throw new RuntimeException("FORBIDDEN_WORKPLACE_ACCESS");
        }

        Long storeEmployeeId = attendanceMapper.findStoreEmployeeIdByNoAndName(
                reqDto.getStoreId(),
                reqDto.getEmployeeNo(),
                reqDto.getStoreEmployeeName()
        );
        if (storeEmployeeId == null) throw new RuntimeException("EMPLOYEE_NOT_FOUND");

        LocalDate workDate = reqDto.getCheckOutTime().toLocalDate();
        AttendanceEntity today = attendanceMapper.findTodayAttendanceForCheckOut(storeEmployeeId, workDate);

        if (today == null || today.getCheckInTime() == null) {
            throw new RuntimeException("NO_CHECK_IN_RECORD");
        }

        int minutes = (int) Duration.between(today.getCheckInTime(), reqDto.getCheckOutTime()).toMinutes();
        if (minutes < 0) minutes = 0;

        attendanceMapper.updateCheckOut(reqDto.toEntity(today.getAttendanceId(), minutes));

        String employeeName = attendanceMapper.findEmployeeName(storeEmployeeId);

        return AttendanceCheckOutRespDto.builder()
                .attendanceId(today.getAttendanceId())
                .storeId(reqDto.getStoreId())
                .storeEmployeeId(storeEmployeeId)
                .employeeName(employeeName)
                .checkOutTime(reqDto.getCheckOutTime())
                .workedMinutes(minutes)
                .build();
    }

    /**
     * 직원 로그인: 내 출결 조회
     */
    public List<MyAttendanceRespDto> getMyAttendances(Long loginUserId, Long storeId) {

        int roleId = userMapper.findRoleIdByUserId(loginUserId);
        if (roleId != 3) throw new RuntimeException("FORBIDDEN_EMPLOYEE_ONLY");

        Long storeEmployeeId = attendanceMapper.findStoreEmployeeId(loginUserId, storeId);
        if (storeEmployeeId == null) throw new RuntimeException("FORBIDDEN_WORKPLACE_ACCESS");

        return attendanceMapper.findMyAttendances(storeEmployeeId);
    }

    /**
     * 사장: 매장 출근현황 조회
     */
    public Map<String, Object> getOwnerAttendance(Long storeId, Long loginUserId, LocalDate workDate) {

        int roleId = userMapper.findRoleIdByUserId(loginUserId);
        if (roleId != 2) throw new RuntimeException("FORBIDDEN_OWNER_ONLY");

        if (attendanceMapper.countOwnerStore(storeId, loginUserId) == 0) {
            throw new RuntimeException("FORBIDDEN_WORKPLACE_ACCESS");
        }

        List<OwnerAttendanceRespDto> items = attendanceMapper.findOwnerAttendanceItems(storeId, workDate);

        Map<String, Object> resp = new HashMap<>();
        resp.put("storeCard", attendanceMapper.findStoreCard(storeId));
        resp.put("openTime", attendanceMapper.findOpenTime(storeId, workDate));
        resp.put("closeTime", attendanceMapper.findCloseTime(storeId, workDate));
        resp.put("items", items);
        return resp;
    }
}
