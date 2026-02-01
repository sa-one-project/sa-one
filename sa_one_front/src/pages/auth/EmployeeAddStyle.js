/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  padding: 40px;
  background-color: #f2f7fc; 
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

export const formWrapper = css`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid #e1e4e8;
  box-shadow: none; 
  width: 100%;
  max-width: 1200px;
  height: fit-content;
`;

export const topSection = css`
  display: flex;
  gap: 30px;
  width: 100%;
`;

export const imageSection = css`
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const previewBox = css`
  width: 200px;
  height: 250px;
  border: 1px solid #eef0f2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  color: #bbb;
  font-size: 14px;
  border-radius: 8px;
`;

export const tableGrid = css`
  flex: 1;
  display: grid;
  grid-template-columns: 120px 1fr 120px 1fr;
  border-top: 2px solid #adc9ff;
  border-left: 1px solid #eee;

  div {
    padding: 10px 15px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    min-height: 50px;
  }
`;

export const labelCell = css`
  background-color: #f4f7ff;
  color: #445;
  font-weight: 600;
  justify-content: center !important;
`;

export const inputCell = css`
  input, select {
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    background: transparent;
  }
`;

export const buttonArea = css`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 40px; 
`;

export const listWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #eee; 
  padding-top: 30px;
`;

export const listTable = css`
  width: 100%;
  border-collapse: collapse;
  
  th {
    background-color: #c9dfff;
    padding: 12px;
    border: 1px solid #eee;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  td {
    padding: 15px;
    border: 1px solid #eee;
    text-align: center;
    font-size: 14px;
    color: #555;
  }
`;

export const listProfileCircle = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ddd;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #bbb;
`;

export const listButtonArea = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const saveBtn = css`
  background-color: #94c1ff;
  color: white;
  border: none;
  padding: 10px 40px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(148, 193, 255, 0.3);
  &:hover { background-color: #79afff; }
`;

export const cancelBtn = css`
  background-color: #eee;
  color: #666;
  border: none;
  padding: 10px 25px;
  border-radius: 20px;
  cursor: pointer;
`;