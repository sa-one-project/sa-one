import React from "react";

function CalendarSidebar({ 
  year, month, themeColor, isOwner, 
  prevMonth, nextMonth, 
  handleEditClick, noteText, setNoteText 
}) {

    // 기본적인 화면 구성함. 나중에 따로 스타일 파주기
  
  return (
    <div style={{ width: "200px", padding: "10px", borderRight: "1px solid #ccc" }}>
      {/* 날짜 표시 및 이동 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: themeColor }}>
        <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer" }}>{"<"}</button>
        <div>
          <h2 style={{ margin: 0 }}>{year}</h2>
          <h1 style={{ fontSize: "50px", margin: "0" }}>{month}</h1>
        </div>
        <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer" }}>{">"}</button>
      </div>

      <div style={{ margin: "20px 0" }}>
        {/* 사장님일 때만 버튼 노출 */}
        {isOwner && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={handleEditClick}>스케줄 수정</button>
            <button onClick={() => alert("저장되었습니다")}>저장</button>
          </div>
        )}
      </div>

      {isOwner && (
        <div>
          <h4 style={{ color: themeColor, margin: "5px 0" }}>NOTE</h4>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="사장님 전용 메모"
            style={{ width: "100%", height: "150px", resize: "none" }}
          />
        </div>
      )}
    </div>
  );
}

export default CalendarSidebar;