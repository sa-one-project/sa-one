package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserMeRespDto {

    // 공통 유저 정보
    private Long userId;
    private String role;
    private String username;

    private String email;
    private String phone;

    private String name;
    private String gender;
    private LocalDate birthDate;

    private String imgUrl;

    private EmployeeInfo employeeInfo;

    private OwnerInfo ownerInfo;


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor

    public static class EmployeeInfo {

        private Long storeEmployeeId;
        private String storeName;
        private String employeeNo;
        private String payType;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor

    public static class OwnerInfo {

        private List<StoreInfo> storeList;
        private StoreInfo selectedStore;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor

    public static class StoreInfo {

        private Long storeId;
        private String storeName;
        private String businessNumber;
        private String storePhone;
        private String address;

        private String companyType;   // 특례사항
        private String industryName;  // 고용보험업종
        private String industryCode;  // 업종코드

    }

}

