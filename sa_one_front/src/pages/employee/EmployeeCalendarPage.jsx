import React, { useState } from "react";

function EmployeeCalendarPage() {
  // 현재 사용자가 사장(ADMIN)인지 직원(USER)인지 구분하는 상태
  const [userRole, setUserRole] = useState("ADMIN"); 

  // 권한에 따라 창 색깔(themeColor)을 변수로 지정
  const isOwner = userRole === "ADMIN";
  const themeColor = isOwner ? "skyblue" : "mediumpurple"; // 사장은 하늘색, 직원은 보라색

  return (
    <div style={{ padding: "20px" }}>
      {/* 권한 테스트용 (나중엔 삭제) */}
      <button onClick={() => setUserRole(isOwner ? "USER" : "ADMIN")}>
        모드 전환 (현재: {userRole})
      </button>

      <div style={{ 
        border: `5px solid ${themeColor}`, // 여기서 창 색깔이 결정됨
        padding: "20px", 
        borderRadius: "15px" 
      }}>
        <h1 style={{ color: themeColor }}>
          {isOwner ? "사장님용 캘린더" : "직원용 캘린더"}
        </h1>

        {/* 사장님일 때만 보이는 버튼 */}
        {isOwner && (
          <div style={{ marginBottom: "10px" }}>
            <button>스케줄 수정</button>
            <button>저장</button>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
          {/* 달력 날짜 껍데기들... */}
          {Array.from({ length: 31 }).map((_, i) => (
            <div key={i} style={{ border: "1px solid #ddd", height: "50px" }}>{i + 1}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeCalendarPage;