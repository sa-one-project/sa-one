package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.response.PayrollDetailRespDto;
import com.korit.sa_one_back.dto.response.PayrollIdRespDto;
import com.korit.sa_one_back.entity.payroll.PayrollDetailEntity;
import com.korit.sa_one_back.entity.payroll.PayrollEntity;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.payroll.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payrolls")
public class PayrollController {

    private final PayrollService payrollService;

    @GetMapping("/me")
    public ResponseEntity<List<PayrollEntity>> listMyPayrolls(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestParam Long storeId
    ) {
        Long userId = principalUser.getUserId();
        return ResponseEntity.ok(payrollService.listMyPayrolls(userId, storeId));
    }

    @GetMapping("/me/{yyyyMM}")
    public ResponseEntity<PayrollDetailRespDto> getMyPayrollDetail(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestParam Long storeId,
            @PathVariable String yyyyMM
    ) {
        Long userId = principalUser.getUserId();
        return ResponseEntity.ok(payrollService.getMyPayrollDetail(userId, storeId, yyyyMM));
    }
}