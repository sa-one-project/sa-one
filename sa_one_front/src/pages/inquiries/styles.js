/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import contentBg from "../../assets/content.png";

export const page = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 50px 20px;
  position: relative;
  overflow: hidden;
  background: #f5f8ff;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url(${contentBg}) no-repeat center center;
    background-size: cover;
    filter: blur(6px);
    transform: scale(1.25);
    opacity: 0.35;
    z-index: 0;
  }
`;

export const card = css`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  border-radius: 60px 0 60px 0;
  padding: 50px 50px 35px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(225, 231, 255, 0.7);
`;

export const header = css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
`;

export const title = css`
  margin: 0;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -1px;
  background: linear-gradient(to right, #98e9f0, #c3c2ed);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const subText = css`
  margin: 6px 0 0;
  color: #94a3b8;
  font-weight: 600;
  font-size: 14px;
`;

export const controls = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin: 18px 0 22px;
`;

export const leftControls = css`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const select = css`
  height: 44px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid #d9dfff;
  background: #f4f6ff;
  color: #475569;
  font-weight: 700;
  outline: none;
`;

export const input = css`
  height: 44px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid #d9dfff;
  background: #ffffff;
  color: #334155;
  font-weight: 600;
  outline: none;
  min-width: 220px;

  &::placeholder {
    color: #94a3b8;
    font-weight: 600;
  }
`;

export const btnRow = css`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const primaryBtn = css`
  height: 44px;
  padding: 0 18px;
  border-radius: 14px;
  border: none;
  background: #adc4f0;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(173, 196, 240, 0.35);
    filter: brightness(1.03);
  }
  &:active {
    transform: translateY(0px);
  }
`;

export const ghostBtn = css`
  height: 44px;
  padding: 0 18px;
  border-radius: 14px;
  border: 1px solid #d9dfff;
  background: #f1f5ff;
  color: #64748b;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.98);
    transform: translateY(-1px);
  }
`;

export const infoLine = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 13px;
  color: #94a3b8;
  font-weight: 600;
`;

export const table = css`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(217, 223, 255, 0.9);
  background: #ffffff;
`;

export const thead = css`
  display: grid;
  grid-template-columns: 90px 140px 1fr 160px;
  gap: 12px;
  padding: 14px 16px;
  background: #eceeff;
  color: #475569;
  font-weight: 900;
  font-size: 13px;
`;

export const row = css`
  display: grid;
  grid-template-columns: 90px 140px 1fr 160px;
  gap: 12px;
  padding: 14px 16px;
  border-top: 1px solid #eef2ff;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f7f9ff;
  }
`;

export const cell = css`
  display: flex;
  align-items: center;
  font-weight: 650;
  color: #334155;
  font-size: 14px;
  min-width: 0;
`;

export const muted = css`
  color: #94a3b8;
  font-weight: 700;
  font-size: 13px;
`;

export const statusPill = (status) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: -0.2px;

  ${status === "OPEN" &&
  `
    background: #eef4ff;
    color: #5b8cff;
    border: 1px solid #d7e5ff;
  `}
  ${status === "IN_PROGRESS" &&
  `
    background: #fff6e6;
    color: #d18b24;
    border: 1px solid #ffe5b9;
  `}
  ${status === "CLOSED" &&
  `
    background: #eaf7f3;
    color: #1f9d7a;
    border: 1px solid #c9efe2;
  `}
  ${(!status || status === "") &&
  `
    background: #f1f5f9;
    color: #64748b;
    border: 1px solid #e2e8f0;
  `}
`;

export const empty = css`
  padding: 22px;
  text-align: center;
  color: #94a3b8;
  font-weight: 700;
`;

export const footer = css`
  margin-top: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

export const pageBtn = css`
  height: 42px;
  padding: 0 16px;
  border-radius: 14px;
  border: 1px solid #d9dfff;
  background: #ffffff;
  color: #64748b;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const pageInfo = css`
  min-width: 110px;
  text-align: center;
  color: #475569;
  font-weight: 900;
`;