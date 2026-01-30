package com.korit.sa_one_back.controller.admin;

import com.korit.sa_one_back.dto.request.admin.ApplicationRejectReqDto;
import com.korit.sa_one_back.dto.request.admin.StoreApplicationListReqDto;
import com.korit.sa_one_back.dto.response.admin.PageRespDto;
import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.service.admin.AdminStoreApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/store-applications")
public class AdminStoreApplicationController {

    private final AdminStoreApplicationService adminStoreApplicationService;

    @GetMapping
    public ResponseEntity<PageRespDto<StoreApplicationEntity>> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        StoreApplicationListReqDto dto = StoreApplicationListReqDto.builder()
                .status(status)
                .page(page)
                .size(size)
                .build();

        return ResponseEntity.ok(
            adminStoreApplicationService.list(dto)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreApplicationEntity> detail(@PathVariable Long id) {
        return ResponseEntity.ok(adminStoreApplicationService.detail(id));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Void> approve(@PathVariable Long id) {
        adminStoreApplicationService.approve(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Void> reject(@PathVariable Long id, @RequestBody ApplicationRejectReqDto body) {
        adminStoreApplicationService.reject(id, body.getReason());
        return ResponseEntity.ok().build();
    }
}