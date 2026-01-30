import React, { useState } from "react";

function CalendarModal({ modalType, month, selectedDay, data, themeColor, isOwner, closeModal, onSendMessage }) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    // 1. 부모(Page)의 알림바에 메시지 전달
    if (onSendMessage) {
      onSendMessage(inputText);
    }
    // 2. 사장님 확인용 알림
    alert("스케줄 수정이 완료되었습니다.");
    closeModal();
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      {modalType === "view" ? (
        <div style={{ backgroundColor: "white", width: "400px", borderRadius: "8px", padding: "15px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{month}월 {selectedDay}일 출근 현황</div>
          {data && data.map((item, idx) => (
            <div key={idx}>{item.name} - {item.info}</div>
          ))}
          <button onClick={closeModal} style={{ marginTop: "10px" }}>닫기</button>
        </div>
      ) : (
        /* 스케줄 수정 팝업 (팝업 디자인 대충 미리 해둠 나중에 따로) */
        <div style={{ backgroundColor: "#A0C4FF", width: "450px", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px", color: "white", display: "flex", justifyContent: "space-between" }}>
            <span>{month}월 {selectedDay}일 스케줄 수정</span>
            <button onClick={closeModal} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>X</button>
          </div>
          
          {/* 채팅 */}
          <div style={{ height: "250px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "#f0f8ff" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "30px", height: "30px", backgroundColor: "#ccc", borderRadius: "50%" }}></div>
              <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "0 10px 10px 10px", maxWidth: "70%", fontSize: "13px" }}>
                {isOwner ? "변경할 스케줄 내용을 확정해 주세요." : "변경하실 스케줄을 입력해 주세요."}
                <br/>
                예) 홍길동 / 09시 ~ 18시 / 월~금
                <br/>
                <button 
                  onClick={() => setIsInputActive(true)} 
                  style={{ marginTop: "8px", display: "block", backgroundColor: "#6B99FF", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                >
                  직접 설정하기
                </button>
              </div>
            </div>
          </div>

          {/* 하단 입력창 바 */}
          <div style={{ padding: "10px", display: "flex", gap: "5px", backgroundColor: "#6B99FF" }}>
            <input 
              type="text" 
              disabled={!isInputActive} 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isInputActive ? "내용을 입력하세요" : ""}
              style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "none" }}
            />
            <button 
              onClick={handleSend}
              style={{ padding: "8px 15px", backgroundColor: isInputActive ? "white" : "#A0C4FF", color: "#6B99FF", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
            >
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarModal;