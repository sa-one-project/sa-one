package com.korit.sa_one_back.service.admin;

import com.korit.sa_one_back.dto.response.AdminDashboardRespDto;
import com.korit.sa_one_back.mapper.admin.AdminDashboardMapper;
import com.korit.sa_one_back.mapper.admin.PolicyType;
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

    public AdminDashboardRespDto getDashboard() {
        return AdminDashboardRespDto.builder()
                .pendingApplications(countPendingApplication())
                .openInquiries(countPendingInquiry())
                .policyAlerts(getPolicyAlertsIfDue())
                .build();
    }

    public int countPendingApplication() {
        return adminDashboardMapper.countStoreApplicationsByStatus();
    }

    public int countPendingInquiry() {
        return adminDashboardMapper.countPendingInquiry();
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

        for (PolicyType policy : PolicyType.values()) {
            result.put(policy.getKey(), policy.exists(adminDashboardMapper, year));
        }
        return result;
    }

}
