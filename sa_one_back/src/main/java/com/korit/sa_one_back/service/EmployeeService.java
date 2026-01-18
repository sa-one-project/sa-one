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

    /**
     * 직원 등록 알고리즘
     * 1) store 존재 확인
     * 2) 사장 권한 확인 (store_tb.user_id == 로그인 userId)
     * 3) positionName -> positionId 조회
     * 4) email로 user 조회 -> 없으면 생성, 있으면 최신 정보 업데이트(선택)
     * 5) store_employee 중복(활성) 체크
     * 6) store_employee insert (work_status는 ACTIVE로 고정)
     * 7) pay insert (start_date는 joinDate로 고정, end_date는 null)
     */
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

        // 3) positionName -> positionId 변환 (DB 저장은 id로 해야 함)
        Long positionId = positionMapper.findPositionIdByName(dto.getPositionName());
        if (positionId == null) {
            throw new RuntimeException("POSITION_NOT_FOUND");
        }

        // 4) user 처리 (email 기준)
        Long employeeUserId = userMapper.findUserIdByEmail(dto.getEmail());

        if (employeeUserId == null) {
            // 신규 유저 생성
            UserEntity user = UserEntity.builder()
                    .username(dto.getEmail())
                    .password(null)
                    .name(dto.getName())
                    .phone(dto.getPhone())
                    .email(dto.getEmail())
                    .imgUrl(dto.getImgUrl())
                    .imgPath(dto.getImgPath())
                    .roleId(3) // EMPLOYEE
                    .birthDate(dto.getBirthDate())
                    .build();

            userMapper.insertLocalUser(user); // useGeneratedKeys로 userId 채움
            employeeUserId = user.getUserId();
        } else {
            // 기존 유저면 프로필 갱신(선택)
            userMapper.updateEmployeeProfile(employeeUserId, dto);
        }

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
                .workStatus("ACTIVE") // 요청 DTO에서 안 받고, 서버에서 ACTIVE 고정
                .build();

        employeeMapper.insertStoreEmployee(se); // useGeneratedKeys로 storeEmployeeId 채움

        // 7) pay insert (초기 급여는 joinDate부터 적용)
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
     * - 여기서는 사장만 조회 가능으로 처리(정책에 맞게 변경 가능)
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
