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
public class StoreEntity {
    private Long storeId;
    private String storeName;
    private String businessNumber;
    private String ownerName;
    private String storePhone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
