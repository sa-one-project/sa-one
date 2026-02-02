import { css } from "@emotion/react";

export const container = css`
  padding: 50px;
  background-color: #f2f7fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const title = css`
  font-size: 28px;
  color: #7ba8d1;
  margin-bottom: 30px; 
  font-weight: bold;
  align-self: flex-start;
`;

export const formWrapper = css`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 50px 40px;
  border-radius: 40px;
  border: 1px solid #e1e4e8;
  width: 100%;
  max-width: 1350px;
  height: fit-content;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
`;

export const contentWrapper = css`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

export const card = css`
  flex: 1;
  background: white;
  border: 1.5px solid #d9e8f7;
  border-radius: 30px;
  padding: 35px 25px;
  box-shadow: 0 10px 25px rgba(123, 168, 209, 0.08);
  display: flex;
  flex-direction: column;
`;

export const cardTitle = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
`;

export const profileSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  img {
    width: 110px;
    height: 140px;
    background-color: #d9e8f7;
    border-radius: 20px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  button {
    background: none;
    border: none;
    font-size: 12px;
    color: #888;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const inputGroup = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const inputRow = css`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    width: 85px;
    font-size: 14px;
    color: #333;
    font-weight: 600;
  }

  .input-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;

    input, select {
      width: 100%;
      padding: 9px 12px;
      border: 1px solid #d1d1d1;
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      background: #fff;
      &:read-only { color: #888; }
    }

    .inner-btn {
      position: absolute;
      right: 10px;
      background: none;
      border: none;
      color: #aaa;
      font-size: 13px;
      cursor: pointer;
    }
  }
`;

export const footer = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-top: 50px;
`;

export const mainBtn = css`
  background-color: #9dbfff;
  color: white;
  border: none;
  padding: 13px 40px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(157, 191, 255, 0.4);
`;

export const withdrawBtn = css`
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  margin-right: auto;
`;