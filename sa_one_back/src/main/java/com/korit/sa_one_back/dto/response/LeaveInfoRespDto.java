package com.korit.sa_one_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
    leave_tb + leave_type_tb 결과를 화면에 표시하기 위한 DTO
*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaveInfoRespDto {
    private Long leaveId;
    private String leaveType;     // 코드처럼 쓰고 싶으면 사용
    private String leaveTypeName; // 화면 표시용
}