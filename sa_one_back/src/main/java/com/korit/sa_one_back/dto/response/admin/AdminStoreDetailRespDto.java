package com.korit.sa_one_back.dto.response.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStoreDetailRespDto {
    private Long storeId;
    private String storeName;
    private String address;
    private String businessNumber;
    private String ownerName;
    private String storePhone;

    private Long userId;

    private String companyType;
    private String industryCode;
    private String industryName;

    private String createdAt;
    private String updatedAt;
}
