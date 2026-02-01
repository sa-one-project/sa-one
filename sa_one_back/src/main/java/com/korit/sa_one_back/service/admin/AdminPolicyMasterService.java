package com.korit.sa_one_back.service.admin;

import com.korit.sa_one_back.dto.request.admin.policy.*;
import com.korit.sa_one_back.dto.response.PolicyMasterYearRespDto;
import com.korit.sa_one_back.mapper.admin.AdminPolicyMasterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminPolicyMasterService {

    private final AdminPolicyMasterMapper adminPolicyMasterMapper;

    public PolicyMasterYearRespDto getYear(int year) {
        return PolicyMasterYearRespDto.builder()
                .year(year)
                .taxRate(adminPolicyMasterMapper.findTaxRate(year))
                .minimumWage(adminPolicyMasterMapper.findMinimumWage(year))
                .nationalPensionLimit(adminPolicyMasterMapper.findNationalPensionLimit(year))
                .healthInsuranceLimit(adminPolicyMasterMapper.findHealthInsuranceLimit(year))
                .insuranceRates(adminPolicyMasterMapper.findInsuranceRates(year))
                .employmentCompanyRates(adminPolicyMasterMapper.findEmploymentCompanyRates(year))
                .industrialAccidentRates(adminPolicyMasterMapper.findIndustrialAccidentRates(year))
                .build();
    }

    public void upsertTaxRate(int year, TaxRateUpsertReqDto dto) {
        adminPolicyMasterMapper.upsertTaxRate(year, dto.getIncomeTaxRate(), dto.getLocalTaxRate());
    }

    public void upsertMinimumWage(int year, MinimumWageUpsertReqDto dto) {
        adminPolicyMasterMapper.upsertMinimumWage(year, dto.getHourlyWage(), dto.getEffectiveFrom());
    }

    @Transactional
    public void upsertLimits(int year, LimitsUpsertReqDto dto) {
        adminPolicyMasterMapper.upsertNationalPensionLimit(year, dto.getNationalPensionLower(), dto.getNationalPensionUpper());
        adminPolicyMasterMapper.upsertHealthInsuranceLimit(year, dto.getHealthInsuranceLower(), dto.getHealthInsuranceUpper());
    }

    @Transactional
    public void upsertInsuranceRates(int year, InsuranceRatesUpsertReqDto dto) {
        adminPolicyMasterMapper.upsertInsuranceRates(year, dto.getItems());
    }

    @Transactional
    public void upsertEmploymentCompanyRates(int year, EmploymentCompanyRatesUpsertReqDto dto) {
        adminPolicyMasterMapper.upsertEmploymentCompanyRates(year, dto.getItems());
    }

    @Transactional
    public void upsertIndustrialAccidentRates(int year, IndustrialAccidentRatesUpsertReqDto dto) {
        adminPolicyMasterMapper.upsertIndustrialAccidentRates(year, dto.getItems());
    }
}