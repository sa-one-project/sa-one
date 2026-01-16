package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.StoreApplicationReqDto;
import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.service.StoreApplicationService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreApplicationService storeService;

    @PostMapping("")
    public void postStoreInformationByOwner(@RequestBody StoreApplicationReqDto dto,
                                            @AuthenticationPrincipal UserEntity user) {
        storeService.postMyApplication(dto, user.getUserId());
    }

    @GetMapping("")
    public void getMyApplication() {
        storeService.getMyApplication()
    }
}
