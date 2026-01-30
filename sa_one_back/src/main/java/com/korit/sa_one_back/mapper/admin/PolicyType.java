package com.korit.sa_one_back.mapper.admin;

import lombok.Getter;

import java.util.function.ToIntBiFunction;

public enum PolicyType {
    MINIMUM_WAGE ("MINIMUM_WAGE", AdminDashboardMapper::existMinimumWage),
    TAX_RATE ("TAX_RATE", AdminDashboardMapper::existTaxRate),
    INSURANCE_RATE ("INSURANCE_RATE", AdminDashboardMapper::existInsuranceRate),
    NATIONAL_PENSION_LIMIT ("NATIONAL_PENSION_LIMIT", AdminDashboardMapper::existNationalPensionRateLimit),
    HEALTH_INSURANCE_LIMIT ("HEALTH_INSURANCE_LIMIT", AdminDashboardMapper::existHealthInsuranceRateLimit),
    EMPLOYMENT_COMPANY_RATE ("EMPLOYMENT_COMPANY_RATE", AdminDashboardMapper::existEmploymentCompanyRate),
    INDUSTRIAL_ACCIDENT_RATE ("INSURANCE_ACCIDENT_RATE", AdminDashboardMapper::existIndustrialAccidentRate);

    @Getter
    private final String key;
    private final ToIntBiFunction<AdminDashboardMapper, Integer> queryFunction;

    PolicyType(String key, ToIntBiFunction<AdminDashboardMapper, Integer> queryFunction) {
        this.key = key;
        this.queryFunction = queryFunction;
    }

    public boolean exists(AdminDashboardMapper mapper, int year) {
        return queryFunction.applyAsInt(mapper, year) == 1;
    }
}
