package com.korit.sa_one_back.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardRespDto {
    private int pendingApplications;
    private int openInquiries;
    private Map<String, Boolean> policyAlerts;

    private int storeCount;
    private int employeeCount;
    private int payrollCount;
}