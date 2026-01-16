package com.korit.sa_one_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreApplicationEntity {
    private Long storeApplicationId;
    private String storeName;
    private String businessNumber;
    private String ownerName;
    private String storePhone;
    private String rejectReason;
    private LocalDateTime reviewedAt;
    private LocalDateTime createdAt;
}
