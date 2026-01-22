package com.korit.sa_one_back.dto.response;

import com.korit.sa_one_back.entity.MyStoreEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyStoreRespDto {
    private Long storeId;
    private String storeName;
    private String address;

    public static MyStoreRespDto fromEntity(MyStoreEntity entity) {
        return MyStoreRespDto.builder()
                .storeId(entity.getStoreId())
                .storeName(entity.getStoreName())
                .address(entity.getAddress())
                .build();
    }
}
