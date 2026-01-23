package com.korit.sa_one_back.mapper.admin;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminDashboardMapper {
    int countStoreApplicationsByStatus();

    int existMinimumWage(int year);
    int existTaxRate(int year);
    int existInsuranceRate(int year);
    int existNationalPensionRateLimit(int year);
    int existHealthInsuranceRateLimit(int year);
    int existEmploymentCompanyRate(int year);
    int existIndustrialAccidentRate(int year);
}
