package com.korit.sa_one_back.controller.admin;

import com.korit.sa_one_back.dto.request.admin.AdminStoreListReqDto;
import com.korit.sa_one_back.dto.response.admin.AdminStoreDetailRespDto;
import com.korit.sa_one_back.dto.response.admin.AdminStoreListItemRespDto;
import com.korit.sa_one_back.dto.response.admin.PageRespDto;
import com.korit.sa_one_back.service.admin.AdminStoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/stores")
public class AdminStoreListController {
    private final AdminStoreService adminStoreService;

    @GetMapping
    public ResponseEntity<PageRespDto<AdminStoreListItemRespDto>> list(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        AdminStoreListReqDto dto = AdminStoreListReqDto.builder()
                .keyword(keyword)
                .page(page)
                .size(size)
                .build();
        return ResponseEntity.ok(adminStoreService.list(dto));
    }

    @GetMapping("/{storeId}")
    public ResponseEntity<AdminStoreDetailRespDto> detail(@PathVariable Long storeId) {
        return ResponseEntity.ok(adminStoreService.detail(storeId));
    }
}
