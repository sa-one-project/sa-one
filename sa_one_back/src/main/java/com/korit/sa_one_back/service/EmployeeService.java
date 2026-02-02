package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.CreateEmployeeReqDto;
import com.korit.sa_one_back.dto.request.DeleteEmployeeReqDto;
import com.korit.sa_one_back.dto.response.EmployeeListRespDto;
import com.korit.sa_one_back.entity.PayEntity;
import com.korit.sa_one_back.entity.StoreEmployeeEntity;
import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.mapper.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * 직원 추가/조회/삭제(퇴사) 서비스
 */
@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final StoreMapper storeMapper;
    private final UserMapper userMapper;
    private final EmployeeMapper employeeMapper;
    private final PayMapper payMapper;
    private final PositionMapper positionMapper;

    @Transactional
    public void createEmployee(Long storeId, Long ownerUserId, CreateEmployeeReqDto dto) {

        // 1) store 존재 확인
        if (storeMapper.countByStoreId(storeId) == 0) {
            throw new RuntimeException("WORKPLACE_NOT_FOUND");
        }

        // 2) 사장 권한 확인
        Long storeOwnerId = storeMapper.findOwnerUserId(storeId);
        if (storeOwnerId == null || !storeOwnerId.equals(ownerUserId)) {
            throw new RuntimeException("FORBIDDEN_OWNER_ONLY");
        }

        // 3) positionName -> positionId 변환
        Long positionId = positionMapper.findPositionIdByName(dto.getPositionName());
        if (positionId == null) {
            throw new RuntimeException("POSITION_NOT_FOUND");
        }

        // 4) user 처리 (email 기준)
        Long employeeUserId = userMapper.findUserIdByEmail(dto.getEmail());

        if (employeeUserId == null) {
            throw new RuntimeException("USER_NOT_FOUND");
        }
        userMapper.updateEmployeeProfile(employeeUserId, dto);

        // 5) 중복 직원 체크 (storeId + userId, ACTIVE)
        if (employeeMapper.existsActiveEmployee(storeId, employeeUserId)) {
            throw new RuntimeException("DUPLICATE_EMPLOYEE");
        }

        // 6) store_employee insert
        StoreEmployeeEntity se = StoreEmployeeEntity.builder()
                .storeId(storeId)
                .userId(employeeUserId)
                .employeeNo(dto.getEmployeeNo())
                .positionId(positionId)
                .joinDate(dto.getJoinDate())
                .workStatus("ACTIVE")
                .build();

        employeeMapper.insertStoreEmployee(se);

        // 7) pay insert
        PayEntity pay = PayEntity.builder()
                .storeEmployeeId(se.getStoreEmployeeId())
                .payType(dto.getPayType())
                .hourlyRate(dto.getHourlyRate())
                .monthlySalary(dto.getMonthlySalary())
                .startDate(dto.getJoinDate())
                .endDate(null)
                .build();

        payMapper.insertPay(pay);
    }


    /**
     * 직원 목록 조회
     * - 사장만 조회 가능
     */
    @Transactional(readOnly = true)
    public List<EmployeeListRespDto> getEmployees(Long storeId, Long requestUserId) {

        if (storeMapper.countByStoreId(storeId) == 0) {
            throw new RuntimeException("WORKPLACE_NOT_FOUND");
        }

        Long storeOwnerId = storeMapper.findOwnerUserId(storeId);
        if (storeOwnerId == null || !storeOwnerId.equals(requestUserId)) {
            throw new RuntimeException("FORBIDDEN_WORKPLACE_ACCESS");
        }

        return employeeMapper.selectEmployees(storeId, LocalDate.now());
    }

    /**
     * 직원 삭제(퇴사 처리)
     * - 물리삭제 X
     * - store_employee_tb.work_status = INACTIVE
     * - 현재 유효 pay_tb.end_date = 오늘로 종료
     */
    @Transactional
    public void deleteEmployees(Long storeId, Long ownerUserId, DeleteEmployeeReqDto dto) {

        Long storeOwnerId = storeMapper.findOwnerUserId(storeId);
        if (storeOwnerId == null || !storeOwnerId.equals(ownerUserId)) {
            throw new RuntimeException("FORBIDDEN_OWNER_ONLY");
        }

        if (dto.getStoreEmployeeId() == null || dto.getStoreEmployeeId().isEmpty()) {
            throw new RuntimeException("INVALID_REQUEST");
        }

        // 요청된 ids가 전부 이 store 소속인지 검증
        int belongCount = employeeMapper.countBelonging(storeId, dto.getStoreEmployeeId());
        if (belongCount != dto.getStoreEmployeeId().size()) {
            throw new RuntimeException("INVALID_REQUEST");
        }

        LocalDate today = LocalDate.now();

        for (Long storeEmployeeId : dto.getStoreEmployeeId()) {
            employeeMapper.updateWorkStatus(storeEmployeeId, "INACTIVE");
            payMapper.closeCurrentPayByEmployee(storeEmployeeId, today);
        }
    }
}
