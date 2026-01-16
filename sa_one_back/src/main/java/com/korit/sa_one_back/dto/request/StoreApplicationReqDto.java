package com.korit.sa_one_back.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StoreApplicationReqDto {
    private Long storeId;
    private Long storeApplicationId;
    private String storeName;
    private String businessNumber;
    private String ownerName;
    private String storePhone;
    private String rejectReason;
    private LocalDateTime reviewedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
