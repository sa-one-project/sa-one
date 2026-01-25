//package com.korit.sa_one_back.mapper;
//
//import com.korit.sa_one_back.dto.response.MyAttendanceRespDto;
//import com.korit.sa_one_back.dto.response.OwnerAttendanceRespDto;
//import com.korit.sa_one_back.dto.response.StoreRespDto;
//import com.korit.sa_one_back.entity.AttendanceEntity;
//import org.apache.ibatis.annotations.Mapper;
//import org.apache.ibatis.annotations.Param;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Mapper
//public interface AttendanceMapper {
//
//    Long findStoreEmployeeId(@Param("userId") Long userId,
//                                               @Param("storeId") Long storeId);
//
//    int countTodayAttendance(@Param("storeEmployeeId") Long storeEmployeeId,
//                             @Param("workDate") LocalDate workDate);
//
//    void insertCheckIn(AttendanceEntity entity);
//
//    AttendanceEntity findTodayAttendanceForCheckOut(@Param("storeEmployeeId") Long storeEmployeeId,
//                                                    @Param("workDate") LocalDate workDate);
//
//    void updateCheckOut(AttendanceEntity entity);
//
//    List<MyAttendanceRespDto> findMyAttendances(@Param("storeEmployeeId") Long storeEmployeeId);
//
//    List<OwnerAttendanceRespDto> findOwnerAttendanceItems(@Param("storeId") Long storeId,
//                                                          @Param("workDate") LocalDate workDate);
//
//    LocalDateTime findOpenTime(@Param("storeId") Long storeId,
//                               @Param("workDate") LocalDate workDate);
//
//    LocalDateTime findCloseTime(@Param("storeId") Long storeId,
//                                @Param("workDate") LocalDate workDate);
//
//    StoreRespDto findStoreCard(@Param("storeId") Long storeId);
//}

package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.response.MyAttendanceRespDto;
import com.korit.sa_one_back.dto.response.OwnerAttendanceRespDto;
import com.korit.sa_one_back.dto.response.StoreRespDto;
import com.korit.sa_one_back.entity.AttendanceEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface AttendanceMapper {

    Long findStoreEmployeeId(@Param("userId") Long userId,
                             @Param("storeId") Long storeId);

    // 사장이 직원 선택(사번+이름)해서 store_employee_id 찾기
    Long findStoreEmployeeIdByNoAndName(@Param("storeId") Long storeId,
                                        @Param("employeeNo") String employeeNo,
                                        @Param("storeEmployeeName") String storeEmployeeName);

    int countTodayAttendance(@Param("storeEmployeeId") Long storeEmployeeId,
                             @Param("workDate") LocalDate workDate);

    void insertCheckIn(AttendanceEntity entity);

    AttendanceEntity findTodayAttendanceForCheckOut(@Param("storeEmployeeId") Long storeEmployeeId,
                                                    @Param("workDate") LocalDate workDate);

    void updateCheckOut(AttendanceEntity entity);

    List<MyAttendanceRespDto> findMyAttendances(@Param("storeEmployeeId") Long storeEmployeeId);

    List<OwnerAttendanceRespDto> findOwnerAttendanceItems(@Param("storeId") Long storeId,
                                                          @Param("workDate") LocalDate workDate);

    LocalDateTime findOpenTime(@Param("storeId") Long storeId,
                               @Param("workDate") LocalDate workDate);

    LocalDateTime findCloseTime(@Param("storeId") Long storeId,
                                @Param("workDate") LocalDate workDate);

    StoreRespDto findStoreCard(@Param("storeId") Long storeId);

    // 사장 소유 매장 확인
    int countOwnerStore(@Param("storeId") Long storeId,
                        @Param("userId") Long userId);

    // 직원 소속 확인
    int countActiveEmployee(@Param("storeId") Long storeId,
                            @Param("userId") Long userId);

    String findEmployeeName(@Param("storeEmployeeId") Long storeEmployeeId);
}

