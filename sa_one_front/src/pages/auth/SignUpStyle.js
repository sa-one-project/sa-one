/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const tableContainer = css`
  display: grid;
  grid-template-columns: 110px 1fr;
  border: 1.5px solid #d8ede6;
  background: white;
  width: 100%;

  .label {
    background: #f0faf7;
    border-bottom: 1.5px solid #d8ede6;
    border-right: 1.5px solid #d8ede6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #555;
    font-size: 14px;
    height: 48px;
  }

  .content {
    border-bottom: 1.5px solid #d8ede6;
    display: flex;
    align-items: center;
    padding: 0 15px;
    height: 48px;
    input { border: none; outline: none; width: 100%; font-size: 14px; background: transparent; }
  }

  .role-selector {
    display: flex; 
    gap: 150px; 
    align-items: center;
    justify-content: flex-start;     
    label { 
      display: flex; 
      align-items: center; 
      gap: 10px; 
      cursor: pointer; 
      font-size: 14px; 
      white-space: nowrap; 
    }

    input[type="radio"] {
      appearance: none; 
      width: 16px; 
      height: 16px; 
      border: 2px solid #ccc; 
      border-radius: 50%;
      position: relative; 
      margin: 0; 
      cursor: pointer;
      &:checked { 
        border-color: #ff6b6b; 
        background-color: #ff6b6b; 
        box-shadow: inset 0 0 0 3px white; 
      }
    }
  }

  .split-row {
    display: grid; grid-template-columns: 1fr 65px 95px; height: 48px; border-bottom: 1.5px solid #d8ede6;
    input { border: none; outline: none; padding-left: 15px; width: 100%; }
    .sub-label {
      background: #f0faf7; border-left: 1.5px solid #d8ede6; border-right: 1.5px solid #d8ede6;
      display: flex; align-items: center; justify-content: center; font-weight: 700; color: #555; font-size: 13px;
    }
    select { border: none; outline: none; padding-left: 10px; cursor: pointer; background: transparent; }
  }

  & > div:nth-last-of-type(-n+2) { border-bottom: none; }
`;

export const photoArea = css`
  display: flex; flex-direction: column; align-items: center; gap: 15px;
  .img-box {
    width: 160px; height: 200px; background: #eef2f5; border-radius: 20px;
    display: flex; align-items: center; justify-content: center; color: #cbd5e0; font-weight: bold;
  }
  button {
    background: #d7f4eb; border: none; padding: 8px 18px; border-radius: 20px;
    font-weight: bold; cursor: pointer; font-size: 13px;
  }
`;

export const actionButton = css`
  padding: 10px 40px;
  border: none;
  border-radius: 25px;
  background: #d7f4eb;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  &:active { transform: translateY(2px); box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); }
`;