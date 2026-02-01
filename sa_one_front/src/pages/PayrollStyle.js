/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 테마 색상 정의
const theme = {
  owner: { main: "#7c98b6", light: "#d6e4f0", text: "#5a7596" },
  employee: { main: "#a797c4", light: "#efebf7", text: "#8a7ab0" }
};

export const container = css`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f7f9fc;
  min-height: 100vh;
`;

export const card = css`
  background: white;
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  position: relative;
`;

export const header = (isOwner) => css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;

  .select-wrapper {
    width: fit-content;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    span { color: ${isOwner ? theme.owner.main : theme.employee.main}; font-size: 12px; }
  }
`;

export const editBtn = css`
  position: absolute;
  top: 135px;
  right: 40px;
  background-color: #e2e8f0;
  border: none;
  padding: 4px 12px;
  border-radius: 2px;
  font-size: 13px;
  color: #4a5568;
  cursor: pointer;
  &:hover { background-color: #cbd5e0; }
`;

export const titleBar = (isOwner) => css`
  background-color: ${isOwner ? theme.owner.light : theme.employee.light};
  color: ${isOwner ? theme.owner.text : theme.employee.text};
  text-align: center;
  padding: 10px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const grid = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
`;

export const rowItem = (isOwner) => css`
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 2px;
  overflow: hidden;

  .main-row {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .label {
    background-color: ${isOwner ? theme.owner.main : theme.employee.main};
    color: white;
    padding: 10px;
    width: 110px;
    text-align: center;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    width: 0;
    border: none;
    padding: 10px;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    outline: none;
    background: transparent;
    color: #333;
    
    &:disabled {
      cursor: default;
      background-color: #fcfcfc;
    }
  }

  .inner-list {
    background: #f8fafc;
    padding: 10px 15px;
    font-size: 11px;
    color: #666;
    border-top: 1px solid #edf2f7;
    text-align: right;
    line-height: 1.6;
  }
`;

export const detailBox = (isOwner) => css`
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;

  .box-header {
    background-color: ${isOwner ? theme.owner.light : theme.employee.light};
    padding: 10px 15px;
    color: ${isOwner ? theme.owner.text : theme.employee.text};
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .box-content {
    padding: 15px 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 60px;
    border-top: 1px solid ${isOwner ? theme.owner.light : theme.employee.light};
    
    .item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      b { font-weight: 700; }
    }
  }
`;

export const totalSection = (isOwner) => css`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  
  .total-card {
    display: flex;
    border: 1px solid ${isOwner ? theme.owner.main : theme.employee.main};
    width: 380px;
    border-radius: 4px;
    overflow: hidden;

    .label {
      background-color: ${isOwner ? theme.owner.main : theme.employee.main};
      color: white;
      padding: 15px 30px;
      font-size: 18px;
      font-weight: bold;
    }

    .value {
      flex: 1;
      padding: 15px 20px;
      text-align: right;
      font-size: 22px;
      font-weight: bold;
      background: white;
    }
  }
`;