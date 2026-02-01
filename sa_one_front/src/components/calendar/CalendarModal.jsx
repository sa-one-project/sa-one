/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from "react";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";
import * as S from "./styles";
import { FaUser, FaClock, FaRegStickyNote } from "react-icons/fa";

function CalendarModal({ modalType, month, selectedDay, themeColor, isOwner, closeModal, onSendMessage, onSave }) {
  const [inputText, setInputText] = useState("");
  const [isInputActive, setIsInputActive] = useState(false); 
  const inputRef = useRef(null);

  const [date, setDate] = useState(new Date(2026, month - 1, selectedDay));
  const [formData, setFormData] = useState({ 
    name: "", 
    reason: "",
    startTime: "09:00", 
    endTime: "18:00"   
  });

  const getFormattedDate = (targetDate) => {
    return `${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`;
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}:00` : `${i}:00`;
    return <option key={hour} value={hour}>{hour}</option>;
  });

  const handleDetailSave = () => {
    if (onSave) onSave({ ...formData, date });
    alert("저장되었습니다.");
    closeModal();
  };

  // 직접 설정하기 클릭 시 입력창 활성화 및 포커스
  const handleActivateInput = () => {
    setIsInputActive(true);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  // 전송 처리 로직 분리
  const handleSend = () => {
    if (isInputActive && inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <div css={S.modalOverlay} onClick={closeModal}>
      <div 
        css={modalType === "view" ? S.detailPopupContent : S.modalContainer(themeColor)} 
        onClick={(e) => e.stopPropagation()}
      >
        {modalType === "view" ? (
          <div className="popup-body">
            <div className="popup-header" style={{margin: '-30px -30px 20px -30px', borderBottom: '1px solid #eee'}}>
              <button className="close-x" onClick={closeModal}>X</button>
            </div>
            
            <h2 className="popup-date">{date.getFullYear()}년 {getFormattedDate(date)}</h2>

            <div className="form-group">
              <div className="form-row">
                <span className="icon-box"><FaUser /></span>
                <input 
                  type="text" 
                  placeholder="직원 이름"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <span className="icon-box"><FaClock /></span>
                <div className="time-click-field">
                  <span>{getFormattedDate(date)}</span>
                  <select 
                    value={formData.startTime} 
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  >
                    {timeOptions}
                  </select>
                  <span className="separator">→</span>
                  <span>{getFormattedDate(date)}</span>
                  <select 
                    value={formData.endTime} 
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  >
                    {timeOptions}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <span className="icon-box"><FaRegStickyNote /></span>
                <input 
                  type="text" 
                  placeholder="사유"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>
            </div>

            <button className="btn-action extra-btn">당일 알바</button>

            <div className="mini-calendar-container">
              <Calendar 
                onChange={setDate} 
                value={date} 
                calendarType="gregory"
                formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
              />
            </div>

            <button className="btn-action popup-save-btn" onClick={handleDetailSave}>
              저장하기
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span>{month}월 {selectedDay}일 스케줄 수정</span>
              <button onClick={closeModal} style={{background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer'}}>X</button>
            </div>

            <div className="chat-container">
              <div className="message-bubble">
                변경하실 스케줄을 입력해 주세요.<br/>
                예) 홍길동 / 09시 ~ 18시 / 월~금
                <br/>
                <button 
                  className="action-btn" 
                  onClick={handleActivateInput}
                >
                  직접 설정하기
                </button>
              </div>
            </div>

            <div className="input-bar">
              <input 
                ref={inputRef}
                type="text" 
                placeholder={isInputActive ? "메세지를 입력하세요..." : "버튼을 눌러 활성화하세요"} 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()} // Enter 키 지원
                disabled={!isInputActive} 
              />
              <button 
                className="send-btn" 
                onClick={handleSend}
                disabled={!isInputActive} // 활성화 상태에 따라 작동
                style={{ 
                  cursor: isInputActive ? "pointer" : "default",
                  opacity: isInputActive ? 1 : 0.6 
                }}
              >
                전송
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CalendarModal;