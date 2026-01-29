package com.korit.sa_one_back.controller.admin;

import com.korit.sa_one_back.dto.response.AdminDashboardRespDto;
import com.korit.sa_one_back.service.admin.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping
    public ResponseEntity<AdminDashboardRespDto> getDashboard() {
        AdminDashboardRespDto dto = adminDashboardService.getDashboard();
        return ResponseEntity.ok(dto);
    }
}

