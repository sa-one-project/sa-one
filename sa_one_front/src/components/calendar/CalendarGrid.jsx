/** @jsxImportSource @emotion/react */
import React from "react";
import * as S from "./styles";

function CalendarGrid({ themeColor, currentDate, handleDateClick, holidays }) {
    const year = currentDate.getFullYear();
    const monthIdx = currentDate.getMonth();
    const firstDayIndex = new Date(year, monthIdx, 1).getDay();
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayIndex });

    return (
        <div css={S.gridContainer(themeColor)}>
            {/* 요일 헤더 */}
            <div className="week-header">
                <div className="sun">일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
            </div>

            {/* 날짜 그리드 */}
            <div className="date-grid">
                {emptyDays.map((_, i) => (
                    <div key={`empty-${i}`} className="date-cell empty"></div>
                ))}
                
                {days.map((day) => {
                    const dayStr = String(day).padStart(2, "0");
                    const holidayName = holidays[dayStr];
                    const isSunday = new Date(year, monthIdx, day).getDay() === 0;
                    const isHoliday = isSunday || holidayName;

                    return (
                        <div
                            key={day}
                            onClick={() => handleDateClick(day)}
                            // 3. 스타일 파일에 정의된 클래스명을 그대로 사용
                            className={`date-cell ${isHoliday ? "is-holiday" : ""}`}
                        >
                            <span className="day-number">{day}</span>
                            {holidayName && <div className="holiday-label">{holidayName}</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CalendarGrid;