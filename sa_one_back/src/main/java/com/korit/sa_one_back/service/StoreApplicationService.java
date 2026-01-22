package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.StoreApplicationReqDto;
import com.korit.sa_one_back.dto.response.MyStoreRespDto;
import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.entity.StoreEntity;
import com.korit.sa_one_back.exception.StoreApplicationException;
import com.korit.sa_one_back.mapper.StoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreApplicationService {
    private final StoreMapper storeMapper;

    // 유저용
    public void postMyApplication(StoreApplicationReqDto dto, Long userId) {
        StoreApplicationEntity storeApplicationEntity = dto.toStoreApplicationEntity(userId);

        storeMapper.insertStoreApplication(storeApplicationEntity);
    }

    public StoreApplicationEntity getMyApplication (Long userId) {
        StoreApplicationEntity storeApplication = storeMapper.selectByUserId(userId);

        if (storeApplication == null) {
            throw new StoreApplicationException();
        }

        return storeApplication;
    }

    public List<MyStoreRespDto> getMyStores(Long userId) {
        return storeMapper.findMyStoresByUserId(userId)
                .stream()
                .map(MyStoreRespDto::fromEntity)
                .collect(Collectors.toList());
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
