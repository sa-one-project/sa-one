package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.request.payroll.*;
import com.korit.sa_one_back.dto.response.PayrollDetailViewRespDto;
import com.korit.sa_one_back.entity.PayEntity;
import com.korit.sa_one_back.entity.payroll.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Mapper
public interface PayrollMapper {
    Long findStoreEmployeePayrollByUserIdAndStoreId(
            @Param("userId") Long userId,
            @Param("storeId") Long storeId
    );

    PayrollEntity findPayrollByYm (
            @Param("storeEmployeeId") Long storeEmployeeId,
            @Param("payslipYearMonth") String payslipYearMonth
    );
    void insertPayroll(PayrollEntity entity);

    List<PayrollDetailEntity> findPayrollDetailsByPayrollId(Long payrollId);
    int insertPayrollDetails(List<PayrollDetailEntity> details);

    List<Map<String, Object>> findPayrollItemCodeIdList();
    Long findPayrollItemIdByCode (String itemCode);

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

    Integer sumWeeklyAllowanceAmountInMonth (
            @Param("storeEmployeeId") Long storeEmployeeId,
            @Param("monthStart") LocalDate monthStart,
            @Param("monthEnd") LocalDate monthEnd
    );

    TaxRateEntity findTaxRate (int year);

    LimitEntity findNationalPensionLimit (int year);
    LimitEntity findHealthInsuranceLimit (int year);

    InsuranceRateEntity findInsuranceRate (
            @Param("insuranceCode") String insuranceCode,
            @Param("year") int year
    );

    StoreBusinessInfoEntity findStoreBusinessInfo (Long storeId);

    List<PayrollEntity> findPayrollListByStoreEmployeeId(Long storeEmployeeId);

    List<PayrollDetailViewRespDto> findPayrollDetailViewByPayrollId(Long payrollId);
}

