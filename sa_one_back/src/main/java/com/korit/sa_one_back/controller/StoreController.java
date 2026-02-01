package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.admin.StoreApplicationReqDto;
import com.korit.sa_one_back.dto.response.MyStoreRespDto;
import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.StoreApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreApplicationService storeService;

    @PostMapping("")
    public void postStoreInformationByOwner(
            @RequestBody StoreApplicationReqDto dto,
            @AuthenticationPrincipal PrincipalUser user
    ) {
        storeService.postMyApplication(dto, user.getUserId());
    }

    @GetMapping("/api/my_application")

    public StoreApplicationEntity getMyApplication(@AuthenticationPrincipal PrincipalUser user) {
        return storeService.getMyApplication(user.getUserId());
    }

    @GetMapping("/api/me")
    public ResponseEntity<List<MyStoreRespDto>> getMyStores(@AuthenticationPrincipal PrincipalUser principalUser) {
        Long userId = principalUser.getUserId();;
        return ResponseEntity.ok(storeService.getMyStores(userId));
    }
}
