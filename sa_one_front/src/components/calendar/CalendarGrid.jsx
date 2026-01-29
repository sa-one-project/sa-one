import React from "react";

function CalendarGrid({ themeColor, currentDate, handleDateClick, holidays }) {
  const year = currentDate.getFullYear();
  const monthIdx = currentDate.getMonth();
  const firstDayIndex = new Date(year, monthIdx, 1).getDay();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayIndex });

  return (
    <div style={{ flex: 1, border: `2px solid ${themeColor}`, padding: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontWeight: "bold", marginBottom: "10px" }}>
        <div style={{ color: "red" }}>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
        {emptyDays.map((_, i) => <div key={`empty-${i}`} style={{ height: "80px" }}></div>)}
        {days.map(day => {
          const dayStr = String(day).padStart(2, "0");
          const holidayName = holidays[dayStr];
          const isSunday = new Date(year, monthIdx, day).getDay() === 0;
          const isRed = isSunday || holidayName;

          return (
            <div 
              key={day} 
              onClick={() => handleDateClick(day)}
              style={{ 
                border: "1px solid #eee", height: "80px", padding: "10px", cursor: "pointer",
                color: isRed ? "red" : "black", backgroundColor: isRed ? "#fff0f0" : "white"
              }}
            >
              <span>{day}</span>
              {holidayName && <div style={{ fontSize: "10px", marginTop: "5px" }}>{holidayName}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;