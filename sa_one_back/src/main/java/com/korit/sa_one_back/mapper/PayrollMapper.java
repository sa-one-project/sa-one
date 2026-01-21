package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.request.payroll.*;
import com.korit.sa_one_back.entity.PayEntity;
import com.korit.sa_one_back.entity.payroll.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface PayrollMapper {
    MonthlyAttendanceSummaryEntity findMonthlySummary (
            @Param("storeEmployeeId") Long storeEmployeeId,
            @Param("payslipYearMonth") String payslipYearMonth
    );

    PayEntity findEffectivePay (
            @Param("storeEmployeeId") Long storeEmployeeId,
            @Param("asOf") LocalDate asOf
    );

    PayPolicyEntity findEffectivePolicy (
            @Param("storeId") Long storeId,
            @Param("asOf") LocalDate asOf
    );

    TaxRateEntity findTaxRate (int year);

    LimitEntity findNationalPensionLimit (int year);
    LimitEntity findHealthInsuranceLimit (int year);

    InsuranceRateEntity findInsuranceRate (
            @Param("insuranceCode") String insuranceCode,
            @Param("year") int year
    );

    StoreBusinessInfoEntity findStoreBusinessInfo (Long storeId);

    Integer sumWeeklyAllowanceAmountInMonth (
            @Param("storeEmployeeId") Long storeEmployeeId,
            @Param("monthStart") LocalDate monthStart,
            @Param("monthEnd") LocalDate monthEnd
    );

    Long findPayrollItemIdByCode (String itemCode);

    PayrollEntity findPayrollByYm (
            @Param("storeEmployeeId") Long storeEmployeeId,
            @Param("payslipYearMonth") String payslipYearMonth
    );

    int insertPayroll(PayrollEntity entity);

    int insertPayrollDetails(List<PayrollDetailEntity> details);
}

