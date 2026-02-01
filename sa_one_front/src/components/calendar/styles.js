import { css } from "@emotion/react";

// 1. 전체 배경: 유지
export const calendarPageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 40px;
  background-color: #f0f4f9; 
  box-sizing: border-box;
  overflow: hidden;
`;

// 2. 메인 화이트 카드: 유지
export const calendarMainCard = css`
  display: flex;
  background-color: #ffffff;
  width: 100%;
  max-width: 1300px;
  min-height: 850px;
  border-radius: 70px; 
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  padding: 70px 60px;
  gap: 60px;
  box-sizing: border-box;
  z-index: 1;
`;

// 3. 사이드바 스타일: themeColor가 주입되지 않을 경우를 대비해 기본값을 이미지 1번의 파란색(#599afd)으로 고정
export const sidebarContainer = (themeColor) => css`
  width: 260px;
  display: flex;
  flex-direction: column;
  color: ${themeColor || "#599afd"}; 

  .date-display {
    margin-bottom: 50px;
    .year-label { font-size: 26px; font-weight: 800; margin-bottom: 5px; }
    .month-label { font-size: 90px; font-weight: 900; line-height: 1; margin: 0; }
  }

  .owner-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 60px;

    button {
      width: 180px;
      padding: 12px;
      border-radius: 30px;
      border: none;
      background-color: ${themeColor || "#599afd"};
      color: white;
      font-weight: 800;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      cursor: pointer;
    }
  }

  .note-section {
    .note-title { font-size: 22px; font-weight: 900; margin-bottom: 25px; letter-spacing: 1px; }
    .todo-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
      .todo-box {
        width: 32px;
        height: 32px;
        border: 3.5px solid ${themeColor || "#599afd"};
        border-radius: 5px;
      }
    }
  }
`;

// 4. 그리드 스타일: themeColor 관련 색상 수정
export const gridContainer = (themeColor) => css`
  flex: 1;
  display: flex;
  flex-direction: column;

  .week-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 25px;
    div { font-weight: 800; color: #b0b0b0; font-size: 16px; }
    .sun { color: #ff6b6b; }
  }

  .date-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    flex: 1;
    border-top: 1.5px solid #eee;
    border-left: 1.5px solid #eee;

    .date-cell {
      border-right: 1.5px solid #eee;
      border-bottom: 1.5px solid #eee;
      min-height: 130px;
      padding: 15px;
      background-color: #ffffff;
      .day-number { font-weight: 800; font-size: 16px; color: #b0b0b0; }
      &.is-holiday {
        background-color: #fff2f2;
        .day-number { color: #ff6b6b; }
      }
    }
  }
`;

// 5. 모달 공통 오버레이
export const modalOverlay = css`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

// 6. 스케줄 수정 모달 (기존 채팅형)
export const modalContainer = (themeColor) => css`
  background-color: white;
  width: 100%;
  max-width: 550px;
  border: 2px solid #599afd; 
  border-radius: 4px; 
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 0; 

  .modal-header {
    background-color: #599afd;
    padding: 15px 20px;
    font-size: 18px;
    font-weight: 800;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-container {
    background-color: #e8effa;
    padding: 30px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 15px;
    min-height: 350px;
  }

  .message-bubble {
    background-color: white;
    padding: 15px;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    max-width: 80%;
    .action-btn {
      display: inline-block;
      margin-top: 10px;
      background-color: #599afd;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 800;
    }
  }

  .input-bar {
    background-color: #599afd;
    padding: 15px;
    display: flex;
    gap: 10px;
    input { flex: 1; height: 40px; padding: 0 15px; border-radius: 4px; border: none; }
    .send-btn {
      width: 90px;
      background-color: #cbdcf8;
      color: #599afd;
      font-weight: 800;
      cursor: pointer;
      border: none;
      border-radius: 4px;
    }
  }
`;

export const detailPopupContent = css`
  background-color: #e8effa;
  width: 380px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: none;
  overflow: hidden;

  .popup-header {
    background-color: white;
    padding: 10px 15px;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #eee;
    .close-x { background: none; border: none; font-size: 20px; cursor: pointer; color: #666; }
  }

  .popup-body {
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .popup-date {
      font-size: 18px; font-weight: 800; text-align: center; margin-bottom: 20px; color: #333;
    }

    .form-row {
      display: flex; align-items: center; gap: 10px;
      border-bottom: 1.5px solid #b0b0b0;
      padding-bottom: 6px; margin-bottom: 18px;

      /* 흰색 박스 제거, 이모지 24px, 블루 컬러 */
      .icon-box {
        width: auto; height: auto; border: none; background: none;
        font-size: 24px; color: #007AFF; 
        display: flex; justify-content: center; align-items: center;
        flex-shrink: 0;
      }
      
      .time-click-field {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;

        select {
          background: none;
          border: none;
          font-size: 15px;
          font-weight: 800;
          color: #007AFF; 
          cursor: pointer;
          outline: none;
          padding: 0;
          appearance: none; 
          text-align: center;
        }

        .separator {
          font-size: 13px;
          color: #888;
          font-weight: bold;
        }
      }

      input { flex: 1; border: none; background: transparent; font-size: 14px; outline: none; }
    }

    .btn-action {
      background-color: #5b86c1; color: white; border: none;
      border-radius: 4px; font-weight: 700; cursor: pointer;
      &:active { transform: scale(0.95); }
    }

    .extra-btn { padding: 6px 12px; font-size: 11px; align-self: flex-end; margin-bottom: 8px; }

    .mini-calendar-container {
      margin: 5px 0;
      background: white;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
      .react-calendar { width: 100% !important; border: none !important; font-size: 10px !important; }
      .react-calendar__tile { padding: 5px 2px !important; }
    }

    .popup-save-btn { padding: 14px; font-size: 15px; width: 100%; margin-top: 15px; }
  }
`;