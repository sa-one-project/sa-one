package com.korit.sa_one_back.controller;

import com.korit.sa_one_back.dto.request.CreateEmployeeReqDto;
import com.korit.sa_one_back.dto.request.DeleteEmployeeReqDto;
import com.korit.sa_one_back.dto.response.EmployeeListRespDto;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 직원 추가/조회/삭제(퇴사) 컨트롤러
 */
@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    /**
     * 직원 등록 (사장)
     */
    @PostMapping("/store/{storeId}/employees")
    public ResponseEntity<?> createEmployee(
            @PathVariable Long storeId,
            @RequestBody CreateEmployeeReqDto dto,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        employeeService.createEmployee(storeId, principalUser.getUserId(), dto);
        return ResponseEntity.ok().build();
    }

    /**
     * 직원 목록 조회
     * - workplaceId를 storeId로 사용
     */
    @GetMapping("/workplaces/{workplaceId}/employees")
    public ResponseEntity<List<EmployeeListRespDto>> getEmployees(
            @PathVariable Long workplaceId,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        return ResponseEntity.ok(employeeService.getEmployees(workplaceId, principalUser.getUserId()));
    }

    /**
     * 직원 삭제(퇴사 처리) - 다중
     * DELETE /store/{storeId}/employees
     */
    @DeleteMapping("/store/{storeId}/employees")
    public ResponseEntity<?> deleteEmployees(
            @PathVariable Long storeId,
            @RequestBody DeleteEmployeeReqDto dto,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        employeeService.deleteEmployees(storeId, principalUser.getUserId(), dto);
        return ResponseEntity.ok()
                .body(Map.of(
                        "success", true,
                        "message", "직원삭제 완료"
                ));
    }
}
