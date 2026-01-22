package com.korit.sa_one_back.service.payroll;

import com.korit.sa_one_back.dto.request.payroll.PayrollDetailDto;
import com.korit.sa_one_back.entity.payroll.InsuranceRateEntity;
import com.korit.sa_one_back.entity.payroll.LimitEntity;
import com.korit.sa_one_back.entity.payroll.PayrollDetailEntity;
import com.korit.sa_one_back.mapper.PayrollMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PayrollFunctions {

    private final PayrollMapper payrollMapper;

    public YearMonth parseYearMonth(String yyyyMm) {
        if (yyyyMm == null || yyyyMm.length() != 6) {
            throw new IllegalStateException("월별 급여명세서 형식은 yyyymm 이어야 합니다. :" + yyyyMm);
        }
        int year = Integer.parseInt(yyyyMm.substring(0, 4));
        int month = Integer.parseInt(yyyyMm.substring(4, 6));
        return YearMonth.of(year, month);
    }

    public int calcMinutesPay(int minutes, int hourlyRate) {
        BigDecimal perMinutes =
                BigDecimal.valueOf(hourlyRate)
                        .divide(BigDecimal.valueOf(60), 10, RoundingMode.HALF_UP);
        return perMinutes.multiply(BigDecimal.valueOf(minutes))
                .setScale(0, RoundingMode.HALF_UP)
                .intValue();
    }

    public int calcPremium(int premiumMinutes, int hourlyRate, double multiplier) {
        if (premiumMinutes <= 0) return 0;
        if (multiplier <= 1.0) return 0;

        BigDecimal extra = BigDecimal.valueOf(multiplier).subtract(BigDecimal.ONE);

        BigDecimal perMinute =
                BigDecimal.valueOf(hourlyRate)
                        .divide(BigDecimal.valueOf(60), 10, RoundingMode.HALF_UP);

        BigDecimal amount = perMinute
                .multiply(BigDecimal.valueOf(premiumMinutes))
                .multiply(extra);

        return amount.setScale(0, RoundingMode.HALF_UP).intValue();
    }

    public int calcRateAmount(int baseAmount, double rate) {
        if (rate <= 0) return 0;
        return BigDecimal
                .valueOf(baseAmount)
                .multiply(BigDecimal.valueOf(rate))
                .setScale(0, RoundingMode.HALF_UP)
                .intValue();
    }

    public int calcInsuranceWithLimit(int grossPay,
                                       LimitEntity limitEntity,
                                       InsuranceRateEntity rateEntity) {
        if (rateEntity == null) return 0;
        double rate = rateEntity.getEmployeeRate();
        if (rate <= 0) return 0;

        int base = grossPay;
        if (limitEntity != null) {
            base = Math.max(base, limitEntity.getLowerLimit());
            base = Math.min(base, limitEntity.getUpperLimit());
        }

        return calcRateAmount(base, rate);
    }

    public int calcInsuranceWithNoLimit(int grossPay, InsuranceRateEntity rateEntity) {
        if (rateEntity == null) return 0;
        double rate = rateEntity.getEmployeeRate();
        if (rate <= 0) return 0;
        return calcRateAmount(grossPay, rate);
    }

    public void addDetail(List<PayrollDetailEntity> details,
                          Long payrollId,
                          Map<String, Long> itemIdMap,
                          PayrollDetailDto dto) {
        Long itemId = itemIdMap.get(dto.getItemCode());

        if (itemId == null) {
            throw new IllegalStateException("payroll_item_id에 item_code가 없습니다." + dto.getItemCode());
        }

        details.add(dto.toEntity(payrollId, itemId));
    }

    public Double rateOrNull(InsuranceRateEntity entity) {
        if (entity == null) return null;
        double rate = entity.getEmployeeRate();
        return (rate <= 0) ? null : rate;
    }

    public Map<String, Long> loadPayrollItemIdMap() {
        List<Map<String, Object>> rows = payrollMapper.findPayrollItemCodeIdList();
        Map<String, Long> map = new HashMap<>();
        for (Map<String, Object> r : rows) {
            String code = (String) r.get("itemCode");
            Object idObj = r.get("payrollItemId");
            if (code == null || idObj == null) continue;
            map.put(code, ((Number) idObj).longValue());
        }
        return map;
    }
}
