package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.StoreApplicationReqDto;
import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.entity.StoreEntity;
import com.korit.sa_one_back.mapper.StoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StoreApplicationService {
    private final StoreMapper storeMapper;

    // 유저용
    public StoreApplicationEntity getMyApplication (Long storeId, Long storeApplicationId) throws IllegalAccessException {
        StoreApplicationEntity storeApplication = storeMapper.selectByUserIdAndStoreApplicationId(storeId, storeApplicationId);

        if (storeApplication == null) {
            throw new IllegalAccessException("요청하신 신청 정보를 찾을 수 없습니다.");
        }

        return storeApplication;
    }

    // 어드민용
    @Transactional
    public void createStoreInformation(StoreApplicationReqDto dto) throws IllegalAccessException {
        StoreApplicationEntity storeApplication = storeMapper.selectByApplicationIdForAdmin(dto.getStoreApplicationId());

        if (storeApplication == null) {
            throw new IllegalAccessException("요청하신 신청 정보를 찾을 수 없습니다.");
        }

        if (!"PENDING".equalsIgnoreCase(storeApplication.getStatus())) {
            throw new IllegalAccessException("이미 처리된 신청입니다.");
        }

        storeMapper.insertStore(dto.toStoreEntity());

        storeMapper.updateApplicationStatus(dto.getStoreApplicationId(), "APPROVED", LocalDateTime.now(), null);
    }

    public void rejectApplication(Long storeApplicationId, String rejectReason) throws IllegalAccessException {
        StoreApplicationEntity storeApplication = storeMapper.selectByApplicationIdForAdmin(storeApplicationId);

        if (storeApplication == null) {
            throw new IllegalAccessException("요청하신 신청 정보를 찾을 수 없습니다.");
        }

        if (!"REJECTED".equalsIgnoreCase(storeApplication.getStatus())) {
            throw new IllegalAccessException("이미 처리된 신청입니다.");
        }

        storeMapper.updateApplicationStatus(storeApplicationId, "REJECTED", LocalDateTime.now(), rejectReason);
    }
}
