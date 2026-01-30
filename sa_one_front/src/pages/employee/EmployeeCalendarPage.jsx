import React, { useState, useEffect } from "react";
import Holidays from "date-holidays"; 
import CalendarSidebar from "../../components/calendar/CalendarSidebar";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import CalendarModal from "../../components/calendar/CalendarModal";

function EmployeeCalendarPage() {
  const [userRole, setUserRole] = useState("ADMIN"); 
  const isOwner = userRole === "ADMIN";
  const themeColor = isOwner ? "skyblue" : "mediumpurple";
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [selectedDay, setSelectedDay] = useState(0);
  const [noteText, setNoteText] = useState(""); // 딱 이거 하나만 추가

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");

  const dailyAttendanceData = {
    "2026-01-26": [
      { name: "김매니저", info: "[1.26] 연차", type: "OFF" },
      { name: "아무개", info: "09:00 출근, 18:30 퇴근 [1.19] - 휴가", type: "NORMAL" },
      { name: "홍길동", info: "09:15 출근, 18:30 퇴근 [1.26] - 지각", type: "LATE" },
    ]
  };

  useEffect(() => {
    const hd = new Holidays("KR");
    const holidayList = hd.getHolidays(year);
    const holidayMap = {};
    holidayList.forEach((h) => {
      const hDate = new Date(h.date);
      if (hDate.getMonth() + 1 === (currentDate.getMonth() + 1)) {
        holidayMap[String(hDate.getDate()).padStart(2, "0")] = h.name;
      }
    });
    setHolidays(holidayMap);
  }, [currentDate, year]);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setUserRole(isOwner ? "USER" : "ADMIN")}>모드 전환</button>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <CalendarSidebar 
          year={year} month={month} themeColor={themeColor} isOwner={isOwner}
          prevMonth={() => setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1))}
          nextMonth={() => setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1))}
          handleEditClick={() => { setModalType("edit"); setShowModal(true); }}
          noteText={noteText} setNoteText={setNoteText}
        />
        <CalendarGrid themeColor={themeColor} currentDate={currentDate} holidays={holidays} handleDateClick={(day) => { setSelectedDay(day); setModalType("view"); setShowModal(true); }} />
      </div>

      {showModal && (
        <CalendarModal 
          modalType={modalType} month={month} selectedDay={selectedDay || "26"}
          data={dailyAttendanceData[`${year}-${month}-${String(selectedDay || "26").padStart(2, "0")}`] || []}
          themeColor={themeColor} closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default EmployeeCalendarPage;