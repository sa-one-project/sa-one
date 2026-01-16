package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.StoreApplicationReqDto;
import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.mapper.StoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreService {
    private final StoreMapper storeMapper;

    public void createStoreInformation(StoreApplicationReqDto dto) {

    }
}
