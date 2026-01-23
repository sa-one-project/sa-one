package com.korit.sa_one_back.service.admin;

import com.korit.sa_one_back.mapper.admin.AdminDashboardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final AdminDashboardMapper adminDashboardMapper;

    public static final class PolicyKey {
        public static final String MINIMUM_WAGE = "MINIMUM_WAGE";
        public static final String TAX_RATE = "TAX_RATE";
        public static final String INSURANCE_RATE = "INSURANCE_RATE";
        public static final String NATIONAL_PENSION_LIMIT = "NATIONAL_PENSION_LIMIT";
        public static final String HEALTH_INSURANCE_LIMIT = "HEALTH_INSURANCE_LIMIT";
        public static final String EMPLOYMENT_COMPANY_RATE = "EMPLOYMENT_COMPANY_RATE";
        public static final String INDUSTRIAL_ACCIDENT_RATE = "INDUSTRIAL_ACCIDENT_RATE";
    }

    public int countPendingApplication() {
        return adminDashboardMapper.countStoreApplicationsByStatus();
    }

    public Map<String, Boolean> getPolicyAlertsIfDue() {
        int targetYear = LocalDate.now().getYear() + 1;

        LocalDate now = LocalDate.now();
        LocalDate dueStartDate = LocalDate.of(targetYear, 1, 1).minusMonths(1);

        if (now.isBefore(dueStartDate)) {
            return Collections.emptyMap();
        }

        Map<String, Boolean> statusMap = countPolicyAlert(targetYear);

        Map<String, Boolean> alerts = new LinkedHashMap<>();

        for (Map.Entry<String, Boolean> e : statusMap.entrySet()) {
            if (!e.getValue()) {
                alerts.put(e.getKey(), false);
            }
        }
        return alerts;
    }

    private Map<String, Boolean> countPolicyAlert(int year) {
        Map<String, Boolean> result = new LinkedHashMap<>();

        result.put(PolicyKey.MINIMUM_WAGE,
                adminDashboardMapper.existMinimumWage(year) == 1);

        result.put(PolicyKey.TAX_RATE,
                adminDashboardMapper.existTaxRate(year) == 1);

        result.put(PolicyKey.INSURANCE_RATE,
                adminDashboardMapper.existInsuranceRate(year) == 1);

        result.put(PolicyKey.NATIONAL_PENSION_LIMIT,
                adminDashboardMapper.existNationalPensionRateLimit(year) == 1);

        result.put(PolicyKey.HEALTH_INSURANCE_LIMIT,
                adminDashboardMapper.existHealthInsuranceRateLimit(year) == 1);

        result.put(PolicyKey.EMPLOYMENT_COMPANY_RATE,
                adminDashboardMapper.existEmploymentCompanyRate(year) == 1);

        result.put(PolicyKey.INDUSTRIAL_ACCIDENT_RATE,
                adminDashboardMapper.existIndustrialAccidentRate(year) == 1);

        return result;
    }

}
