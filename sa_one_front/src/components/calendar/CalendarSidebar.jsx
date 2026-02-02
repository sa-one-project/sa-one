/** @jsxImportSource @emotion/react */
import React from "react";
import * as S from "./styles";

function CalendarSidebar({ 
  year, month, themeColor, isOwner, 
  prevMonth, nextMonth, 
  handleEditClick, noteText, setNoteText 
}) {
  
  return (
    <div css={S.sidebarContainer(themeColor)}>
      {/* 날짜 표시 및 이동 */}
      <div className="date-selector">
        <button className="nav-btn" onClick={prevMonth}>{"<"}</button>
        <div className="date-display">
          <h2 className="year-label">{year}</h2>
          <h1 className="month-label">{month}</h1>
        </div>
        <button className="nav-btn" onClick={nextMonth}>{">"}</button>
      </div>

      <div className="action-section">
        {/* 사장님일 때만 버튼 노출 */}
        {isOwner && (
          <div className="owner-buttons">
            <button className="edit-btn" onClick={handleEditClick}>스케줄 수정</button>
            <button className="save-btn" onClick={() => alert("저장되었습니다")}>저장</button>
          </div>
        )}
      </div>

      {isOwner && (
        <div className="note-section">
          <h4 className="note-title">NOTE</h4>
          <textarea
            className="note-area"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="사장님 전용 메모"
          />
        </div>
      )}
    </div>
  );
}

export default CalendarSidebar;