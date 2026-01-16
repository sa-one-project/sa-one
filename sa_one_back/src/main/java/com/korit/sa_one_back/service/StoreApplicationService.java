package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.StoreApplicationReqDto;
import com.korit.sa_one_back.mapper.StoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreApplicationService {
    private final StoreMapper storeMapper;

    public void getMyApplication (Long storeId, Long storeApplicationId) {

    }

    public void createStoreInformation(StoreApplicationReqDto dto) {

    }
}
