import { css } from "@emotion/react";

// 1. 전체 배경: 화면 전체를 꽉 채우고 카드를 중앙 정렬
export const calendarPageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #f0f4f9;
  margin: 0;
  padding: 40px;
  box-sizing: border-box;
`;

// 2. 메인 화이트 카드: 사이드바와 그리드가 가로로 나란히 배치되도록 고정
export const calendarMainCard = css`
  display: flex; 
  flex-direction: row; /* 가로 배치 강제 */
  background-color: #ffffff;
  width: 100%;
  max-width: 1300px;
  min-height: 850px;
  border-radius: 70px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  padding: 70px 60px;
  gap: 60px;
  box-sizing: border-box;
`;

// 3. 사이드바 스타일
export const sidebarContainer = (themeColor) => css`
  width: 260px;
  flex-shrink: 0; /* 사이드바 크기 고정 */
  display: flex;
  flex-direction: column;
  color: ${themeColor};

  .date-display {
    margin-bottom: 50px;
    .year-label { font-size: 26px; font-weight: 800; margin-bottom: 5px; }
    .month-label { font-size: 90px; font-weight: 900; line-height: 1; margin: 0; }
  }

  /* 버튼 및 노트 섹션 생략 (기존 유지) */
`;

// 4. 그리드 스타일: 날짜 정중앙 배치 및 공휴일 텍스트 색상 강화
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
      cursor: pointer;
      
      /* 날짜 숫자와 공휴일 이름을 완전히 정중앙으로 */
      display: flex;
      flex-direction: column;
      align-items: center; 
      justify-content: center; 
      text-align: center;

      .day-number { 
        font-weight: 800; 
        font-size: 18px; 
        color: #444; /* 평일 숫자는 조금 더 진하게 */
        line-height: 1.2;
      }

      .holiday-label {
        font-size: 14px;
        font-weight: 700;
        margin-top: 4px;
      }
      
      /* 휴일/일요일 상태일 때 숫자와 라벨 모두 빨간색 강제 */
      &.is-holiday {
        background-color: #fff2f2; 
        .day-number, 
        .holiday-label { 
          color: #ff6b6b !important; 
        }
      }
    }
  }
`;

