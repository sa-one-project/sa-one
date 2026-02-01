/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8; 
`;

export const card = css`
  background: white;
  padding: 0; 
  border-radius: 30px;
  width: 100%;
  max-width: 800px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #e0e0e0;
`;

export const title = css`
  font-size: 32px;
  font-weight: 500;
  padding: 40px 0;
  margin: 0;
  color: #000;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
`;

export const form = css`
  display: flex;
  flex-direction: column;
  padding: 60px 100px; 
  gap: 35px;
  align-items: center;
`;

export const inputGroup = css`
  width: 100%;
  text-align: left;

  label {
    display: block;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #333;
  }

  .input-wrapper {
    position: relative;
    width: 100%;

    input {
      width: 100%;
      padding: 20px;
      border: 1px solid #ccc; 
      border-radius: 0; 
      font-size: 18px;
      background-color: #fff;
      box-sizing: border-box;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: #b8d9d5;
        outline: none;
      }

      &.error-border {
        border-color: #ff6b6b !important;
      }
    }

    .error-msg {
      position: absolute;
      right: 0;
      top: -30px;
      color: #ff6b6b;
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

export const actionBtn = css`
  width: 280px; 
  padding: 20px;
  border: none;
  border-radius: 25px; 
  background-color: #d1e7e4;
  color: #000;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  
  transition: all 0.2s ease;

  &:hover {
    background-color: #b8d9d5;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const messageBox = css`
  margin-bottom: 20px;
  font-size: 14px;
  color: #ff4d4f;
  text-align: center;
`;