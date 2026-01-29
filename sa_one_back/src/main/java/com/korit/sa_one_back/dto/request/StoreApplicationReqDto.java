package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.entity.StoreEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StoreApplicationReqDto {
//    private Long storeId;
    private Long storeApplicationId;
    private String storeName;
    private String address;
    private String businessNumber;
    private String ownerName;
    private String storePhone;
    private String status;
    private String rejectReason;
    private LocalDateTime reviewedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long userId;

    public StoreApplicationEntity toStoreApplicationEntity(Long userId) {
        return StoreApplicationEntity.builder()
                .storeName(storeName)
                .address(address)
                .businessNumber(businessNumber)
                .ownerName(ownerName)
                .storePhone(storePhone)
                .userId(userId)
                .build();
    }

    public StoreEntity toStoreEntity() {
        return StoreEntity.builder()
                .storeName(storeName)
                .address(address)
                .businessNumber(businessNumber)
                .ownerName(ownerName)
                .storePhone(storePhone)
                .userId(userId)
                .build();
    }
}
