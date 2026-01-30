package com.korit.sa_one_back.mapper.admin;

import com.korit.sa_one_back.dto.request.admin.policy.EmploymentCompanyRatesUpsertReqDto;
import com.korit.sa_one_back.dto.request.admin.policy.IndustrialAccidentRatesUpsertReqDto;
import com.korit.sa_one_back.dto.request.admin.policy.InsuranceRatesUpsertReqDto;
import com.korit.sa_one_back.entity.payroll.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface AdminPolicyMasterMapper {

    TaxRateEntity findTaxRate(@Param("year") int year);
    MinimumWageEntity findMinimumWage(@Param("year") int year);
    NationalPensionLimitEntity findNationalPensionLimit(@Param("year") int year);
    HealthInsuranceLimitEntity findHealthInsuranceLimit(@Param("year") int year);
    List<InsuranceRateEntity> findInsuranceRates(@Param("year") int year);
    List<EmploymentCompanyRateEntity> findEmploymentCompanyRates(@Param("year") int year);
    List<IndustrialAccidentRateEntity> findIndustrialAccidentRates(@Param("year") int year);

    int upsertTaxRate(@Param("year") int year,
                      @Param("incomeTaxRate") String incomeTaxRate,
                      @Param("localTaxRate") String localTaxRate);

    int upsertMinimumWage(@Param("year") int year,
                          @Param("hourlyWage") Integer hourlyWage,
                          @Param("effectiveFrom") LocalDate effectiveFrom);

    int upsertNationalPensionLimit(@Param("year") int year,
                                   @Param("lower") Integer lower,
                                   @Param("upper") Integer upper);

    int upsertHealthInsuranceLimit(@Param("year") int year,
                                   @Param("lower") Integer lower,
                                   @Param("upper") Integer upper);

    int upsertInsuranceRates(@Param("year") int year,
                             @Param("items") List<InsuranceRatesUpsertReqDto.InsuranceRateUpsertItemDto> items);

    int upsertEmploymentCompanyRates(@Param("year") int year,
                                     @Param("items") List<EmploymentCompanyRatesUpsertReqDto.Item> items);

    int upsertIndustrialAccidentRates(@Param("year") int year,
                                      @Param("items") List<IndustrialAccidentRatesUpsertReqDto.Item> items);
}