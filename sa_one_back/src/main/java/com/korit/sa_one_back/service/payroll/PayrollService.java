package com.korit.sa_one_back.service.payroll;

import com.korit.sa_one_back.dto.request.payroll.PayrollDetailDto;
import com.korit.sa_one_back.dto.request.payroll.PayrollDto;
import com.korit.sa_one_back.entity.PayEntity;
import com.korit.sa_one_back.entity.payroll.*;
import com.korit.sa_one_back.mapper.PayrollMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PayrollService {

    private final PayrollMapper payrollMapper;
    private final PayrollFunctions payrollFunctions;

    @Transactional
    public Long generateMyPayroll(Long userId, Long storeId, String payslipYearMonth) {
        Long storeEmployeeId = storeEmployeeId(userId, storeId);
        return generatePayrollForEmployeeMonth(storeId, storeEmployeeId, payslipYearMonth);
    }

    public PayrollEntity getMyPayroll(Long userId, Long storeId, String payslipYearMonth) {
        Long storeEmployeeId = payrollMapper.findStoreEmployeePayrollByUserIdAndStoreId(userId, storeId);
        PayrollEntity payroll = payrollMapper.findPayrollByYm(storeEmployeeId, payslipYearMonth );
        if (payroll == null) {
            throw new IllegalStateException("급여 명세서가 없습니다. 날짜 :" + payslipYearMonth);
        }
        return payroll;
    }

    public List<PayrollDetailEntity> getMyPayrollDetails(Long userId, Long storeId, String payslipYearMonth) {
        PayrollEntity payroll = getMyPayroll(userId, storeId, payslipYearMonth);
        return payrollMapper.findPayrollDetailsByPayrollId(payroll.getPayrollId());
    }

    private Long storeEmployeeId(Long userId, Long storeId) {
        Long storeEmployeeId = payrollMapper.findStoreEmployeePayrollByUserIdAndStoreId(userId, storeId);
        if (storeEmployeeId == null) {
            throw new IllegalStateException("해당 매장의 직원이 아닙니다.");
        }
        return storeEmployeeId;
    }

    @Transactional
    public Long generatePayrollForEmployeeMonth(Long storeId,
                                                Long storeEmployeeId,
                                                String payslipYearMonth) {
        PayrollEntity existPayroll = payrollMapper.findPayrollByYm(storeEmployeeId, payslipYearMonth);
        if (existPayroll != null) return existPayroll.getPayrollId();

        YearMonth ym = YearMonth.parse(payslipYearMonth);
        LocalDate periodStart = ym.atDay(1);
        LocalDate periodEnd = ym.atEndOfMonth();
        LocalDate asOf = periodEnd;

        MonthlyAttendanceSummaryEntity monthlyEntity = payrollMapper.findMonthlySummary(storeEmployeeId, payslipYearMonth);
        if (monthlyEntity == null) {
            throw new IllegalStateException("월별 출퇴 요약 데이터가 없습니다. storeEmployeeId :"
            + storeEmployeeId + ", 급여명세서 년월 :" + payslipYearMonth);
        }

        PayEntity payEntity = payrollMapper.findEffectivePay(storeEmployeeId, asOf);
        if (payEntity == null) {
            throw new IllegalStateException("유효한 월급 데이터가 없습니다. storeEmployeeId : "
            + storeEmployeeId);
        }

        PayPolicyEntity policyEntity = payrollMapper.findEffectivePolicy(storeId, asOf);
        if (policyEntity == null) {
            throw new IllegalStateException("유효한 월급 정책 데이터가 없습니다. storeId: "
            + storeId);
        }

        Integer hourlyRate = payEntity.getHourlyRate();
        if (hourlyRate == null || hourlyRate <= 0) {
            throw new IllegalStateException("정해진 시급이 없습니다. payId :"
            + payEntity.getPayId() + ", hourlyRate : " + hourlyRate);
        }

        int weeklyAllowanceAmount = 0;
        if (policyEntity.isWeeklyAllowanceYn()) {
            Integer sum = payrollMapper.sumWeeklyAllowanceAmountInMonth(storeEmployeeId, periodStart, periodEnd);
            weeklyAllowanceAmount = (sum == null) ? 0 : sum;
        }

        int totalWorkMinutes = monthlyEntity.getTotalWorkMinutes();
        int totalOvertimeMinutes = monthlyEntity.getTotalOvertimeMinutes();
        int totalNightMinutes = monthlyEntity.getTotalNightMinutes();

        int basePay = payrollFunctions.calcMinutesPay(totalWorkMinutes, hourlyRate);

        double overtimeMultiplier = (policyEntity.getOvertimeMultiplier() <= 0) ? 1.50 : policyEntity.getOvertimeMultiplier();
        double nightMultiplier = (policyEntity.getNightMultiplier() <= 0) ? 1.50 : policyEntity.getNightMultiplier();

        int overtimePremium = payrollFunctions.calcPremium(totalOvertimeMinutes, hourlyRate, overtimeMultiplier);
        int nightPremium = payrollFunctions.calcPremium(totalNightMinutes, hourlyRate, nightMultiplier);

        int grossPay = basePay + weeklyAllowanceAmount + overtimePremium + nightPremium;

        int year = ym.getYear();

        TaxRateEntity taxRateEntity = payrollMapper.findTaxRate(year);
        LimitEntity pensionLimit = payrollMapper.findNationalPensionLimit(year);
        LimitEntity healthLimit = payrollMapper.findHealthInsuranceLimit(year);

        InsuranceRateEntity pensionRate = payrollMapper.findInsuranceRate("NATIONAL_PENSION", year);
        InsuranceRateEntity healthRate = payrollMapper.findInsuranceRate("HEALTH_INSURANCE", year);
        InsuranceRateEntity employmentRate = payrollMapper.findInsuranceRate("EMPLOYMENT_INSURANCE", year);
        InsuranceRateEntity accidentRate = payrollMapper.findInsuranceRate("ACCIDENT_INSURANCE", year);

        int incomeTax = payrollFunctions.calcRateAmount(grossPay, taxRateEntity.getIncomeTaxRate());
        int localTax = payrollFunctions.calcRateAmount(incomeTax, taxRateEntity.getLocalTaxRate());

        int nationalPension = payrollFunctions.calcInsuranceWithLimit(grossPay, pensionLimit, pensionRate);
        int healthInsurance = payrollFunctions.calcInsuranceWithLimit(grossPay, healthLimit, healthRate);
        int employmentInsurance = payrollFunctions.calcInsuranceWithNoLimit(grossPay, employmentRate);

        int totalDeduction = incomeTax + localTax + nationalPension + healthInsurance + employmentInsurance;
        int netPay = grossPay - totalDeduction;

        int industrialAccidentInsurance = payrollFunctions.calcInsuranceWithNoLimit(grossPay, accidentRate);

        PayrollDto dto = PayrollDto.builder()
                .storeEmployeeId(storeEmployeeId)
                .payslipYearMonth(payslipYearMonth)
                .periodStart(periodStart)
                .periodEnd(periodEnd)
                .payDate(null)
                .status("DRAFT")
                .weeklyAllowanceYn(policyEntity.isWeeklyAllowanceYn())
                .overtimeMultiplier(overtimeMultiplier)
                .nightMultiplier(nightMultiplier)

                .totalWorkMinutes(totalWorkMinutes)
                .totalOvertimeMinutes(totalOvertimeMinutes)
                .totalNightMinutes(totalNightMinutes)

                .grossPay(grossPay)
                .totalDeduction(totalDeduction)
                .netPay(netPay)

                .incomeTaxRate(taxRateEntity.getIncomeTaxRate())
                .localTaxRate(taxRateEntity.getLocalTaxRate())
                .nationalPensionRate(payrollFunctions.rateOrNull(pensionRate))
                .healthInsuranceRate(payrollFunctions.rateOrNull(healthRate))
                .employmentInsuranceRate(payrollFunctions.rateOrNull(employmentRate))
                .industrialAccidentInsurance(industrialAccidentInsurance)

                .build();

        PayrollEntity payroll = dto.toEntity();

        payrollMapper.insertPayroll(payroll);
        Long payrollId = payroll.getPayrollId();

        Map<String, Long> itemIdMap = payrollFunctions.loadPayrollItemIdMap();
        List<PayrollDetailEntity> details = new ArrayList<>();

        payrollFunctions
                .addDetail(details, payrollId, itemIdMap,
                        PayrollDetailDto.builder()
                                .itemCode("BASE")
                                .amount(basePay)
                                .minutes(totalWorkMinutes)
                                .unitPrice(hourlyRate)
                                .multiplier(1.0)
                                .memo("기본급")
                                .build());

        if (weeklyAllowanceAmount > 0) payrollFunctions
                .addDetail(details, payrollId, itemIdMap,
                        PayrollDetailDto.builder()
                                .itemCode("WEEKLY_ALLOWANCE")
                                .amount(weeklyAllowanceAmount)
                                .memo("주휴수당")
                                .build());

        if (overtimePremium > 0) payrollFunctions
                .addDetail(details, payrollId, itemIdMap,
                        PayrollDetailDto.builder()
                                .itemCode("OVERTIME_PREMIUM")
                                .amount(overtimePremium)
                                .minutes(totalOvertimeMinutes)
                                .unitPrice(hourlyRate)
                                .multiplier(overtimeMultiplier)
                                .memo("연장 프리미엄")
                                .build());

        if (nightPremium > 0) payrollFunctions
                .addDetail(details, payrollId, itemIdMap,
                        PayrollDetailDto.builder()
                                .itemCode("NIGHT_PREMIUM")
                                .amount(nightPremium)
                                .minutes(totalNightMinutes)
                                .unitPrice(hourlyRate)
                                .multiplier(nightMultiplier)
                                .memo("야간 프리미엄")
                                .build());

        if (incomeTax > 0) payrollFunctions
                .addDetail(details, payrollId, itemIdMap,
                        PayrollDetailDto.builder()
                                .itemCode("INCOME_TAX")
                                .amount(incomeTax)
                                .memo("소득세")
                                .build());

        if (localTax > 0) payrollFunctions
                .addDetail(details, payrollId, itemIdMap,
                        PayrollDetailDto.builder()
                                .itemCode("LOCAL_TAX")
                                .amount(localTax)
                                .memo("지방소득세")
                                .build());

        if (nationalPension > 0) payrollFunctions
                .addDetail(details, payrollId, itemIdMap,
                        PayrollDetailDto.builder()
                                .itemCode("NATIONAL_PENSION")
                                .amount(nationalPension)
                                .memo("국민연금(근로자)")
                                .build());

        if (healthInsurance > 0) payrollFunctions
                .addDetail(details, payrollId, itemIdMap,
                        PayrollDetailDto.builder()
                                .itemCode("HEALTH_INSURANCE")
                                .amount(healthInsurance)
                                .memo("건강보험(근로자)")
                                .build());

        if (employmentInsurance > 0) payrollFunctions
                .addDetail(details, payrollId, itemIdMap,
                        PayrollDetailDto.builder()
                                .itemCode("EMPLOYMENT_INSURANCE")
                                .amount(employmentInsurance)
                                .memo("고용보험(근로자)")
                                .build());

        if (!details.isEmpty()) {
            payrollMapper.insertPayrollDetails(details);
        }

        return payrollId;
    }

}
