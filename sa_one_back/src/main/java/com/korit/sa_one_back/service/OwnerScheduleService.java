package com.korit.sa_one_back.service;

import com.korit.sa_one_back.entity.ScheduleEntity;
import com.korit.sa_one_back.mapper.ScheduleMapper;
import com.korit.sa_one_back.mapper.StoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/*
    사장이 직원 스케줄을 등록/수정/삭제하는 서비스

    권한 정책
    - ROLE_OWNER만 가능
    - 해당 storeId의 진짜 소유주인지 확인
    - storeEmployeeId가 그 store 소속인지 확인
    - scheduleId 수정/삭제 시 그 schedule이 해당 store 소속인지 확인
*/
@Service
@RequiredArgsConstructor
public class OwnerScheduleService {

    private final StoreMapper storeMapper;
    private final ScheduleMapper scheduleMapper;

    private void validateOwner(Long storeId, Long userId, String role) {
        if (!"ROLE_OWNER".equals(role)) throw new RuntimeException("FORBIDDEN_OWNER_ONLY");
        if (storeMapper.countByStoreId(storeId) == 0) throw new RuntimeException("STORE_NOT_FOUND");

        Long ownerUserId = storeMapper.findOwnerUserId(storeId);
        if (ownerUserId == null || !ownerUserId.equals(userId)) throw new RuntimeException("FORBIDDEN_STORE_ACCESS");
    }

    public Long create(Long storeId, Long storeEmployeeId, ScheduleEntity entity, Long userId, String role) {
        validateOwner(storeId, userId, role);

        if (scheduleMapper.countStoreEmployeeInStore(storeId, storeEmployeeId) == 0) {
            throw new RuntimeException("STORE_EMPLOYEE_NOT_FOUND");
        }

        // entity는 DTO에서 toEntity(storeEmployeeId)로 완성됨
        int result = scheduleMapper.insertSchedule(entity);
        if (result == 0) throw new RuntimeException("SCHEDULE_CREATE_FAIL");

        return entity.getScheduleId();
    }

    public void update(Long storeId, Long scheduleId, ScheduleEntity entity, Long userId, String role) {
        validateOwner(storeId, userId, role);

        if (scheduleMapper.countScheduleInStore(storeId, scheduleId) == 0) {
            throw new RuntimeException("SCHEDULE_NOT_FOUND");
        }

        // 프론트에서 scheduleId를 바꿔치기 못하도록 강제로 덮어쓰기
        entity.setScheduleId(scheduleId);

        int result = scheduleMapper.updateSchedule(entity);
        if (result == 0) throw new RuntimeException("SCHEDULE_UPDATE_FAIL");
    }

    public void delete(Long storeId, Long scheduleId, Long userId, String role) {
        validateOwner(storeId, userId, role);

        if (scheduleMapper.countScheduleInStore(storeId, scheduleId) == 0) {
            throw new RuntimeException("SCHEDULE_NOT_FOUND");
        }

        int result = scheduleMapper.deleteSchedule(scheduleId);
        if (result == 0) throw new RuntimeException("SCHEDULE_DELETE_FAIL");
    }
}
