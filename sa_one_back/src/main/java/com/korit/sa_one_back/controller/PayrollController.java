package com.korit.sa_one_back.controller;

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

    @GetMapping("/api/me")
    public ResponseEntity<PayrollEntity> getMyPayroll(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestParam Long storeId,
            @RequestParam("ym") String payslipYearMonth
    ) {
        Long userId = principalUser.getUserId();
        return ResponseEntity.ok(payrollService.getMyPayroll(userId, storeId, payslipYearMonth));
    }

    @PostMapping("/api/me")
    public ResponseEntity<PayrollIdRespDto> generateMyPayroll(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestParam Long storeId,
            @RequestParam("ym") String payslipYearMonth
    ) {
        Long userId = principalUser.getUserId();
        Long payrollId = payrollService.generateMyPayroll(userId, storeId, payslipYearMonth);
        return ResponseEntity.ok(new PayrollIdRespDto(payrollId));
    }

    @GetMapping("/api/me/details")
    public ResponseEntity<List<PayrollDetailEntity>> getMyPayrollDetails(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestParam Long storeId,
            @RequestParam("ym") String payslipYearMonth
    ) {
        Long userId = principalUser.getUserId();
        return ResponseEntity.ok(payrollService.getMyPayrollDetails(userId, storeId, payslipYearMonth));
    }
}