package com.korit.sa_one_back.controller.admin;

import com.korit.sa_one_back.dto.request.admin.policy.*;
import com.korit.sa_one_back.dto.response.PolicyMasterYearRespDto;
import com.korit.sa_one_back.service.admin.AdminPolicyMasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/policy-master")
public class AdminPolicyMasterController {

    private final AdminPolicyMasterService adminPolicyMasterService;

    @GetMapping("/{year}")
    public ResponseEntity<PolicyMasterYearRespDto> get(@PathVariable int year) {
        return ResponseEntity.ok(adminPolicyMasterService.getYear(year));
    }

    @PutMapping("/{year}/tax-rate")
    public ResponseEntity<Void> upsertTaxRate(@PathVariable int year, @RequestBody TaxRateUpsertReqDto dto) {
        adminPolicyMasterService.upsertTaxRate(year, dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{year}/minimum-wage")
    public ResponseEntity<Void> upsertMinimumWage(@PathVariable int year, @RequestBody MinimumWageUpsertReqDto dto) {
        adminPolicyMasterService.upsertMinimumWage(year, dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{year}/limits")
    public ResponseEntity<Void> upsertLimits(@PathVariable int year, @RequestBody LimitsUpsertReqDto dto) {
        adminPolicyMasterService.upsertLimits(year, dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{year}/insurances")
    public ResponseEntity<Void> upsertInsuranceRates(@PathVariable int year, @RequestBody InsuranceRatesUpsertReqDto dto) {
        adminPolicyMasterService.upsertInsuranceRates(year, dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{year}/employment-company-rates")
    public ResponseEntity<Void> upsertEmploymentCompanyRates(@PathVariable int year, @RequestBody EmploymentCompanyRatesUpsertReqDto dto) {
        adminPolicyMasterService.upsertEmploymentCompanyRates(year, dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{year}/industrial-accident-rates")
    public ResponseEntity<Void> upsertIndustrialAccidentRates(@PathVariable int year, @RequestBody IndustrialAccidentRatesUpsertReqDto dto) {
        adminPolicyMasterService.upsertIndustrialAccidentRates(year, dto);
        return ResponseEntity.ok().build();
    }
}
