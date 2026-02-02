/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  background-color: #f0f4f9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const mainCard = css`
  background-color: white;
  width: 100%;
  max-width: 1200px;
  min-height: 700px;
  border-radius: 50px;
  display: flex;
  padding: 60px;
  gap: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

export const leftSection = css`
  flex: 0.8;
  border-right: 1.5px solid #f0f0f0;
  padding-right: 40px;
`;

export const rightSection = css`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const title = css`
  color: #599afd;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 25px;
`;

export const summaryBox = (isAbsent) => css`
  flex: 1;
  background-color: ${isAbsent ? '#e8f7f5' : '#eef4ff'};
  border-radius: 30px;
  padding: 30px;
  text-align: center;
  strong { display: block; font-size: 45px; margin: 15px 0; color: #333; }
`;

export const infoArea = css`
  font-size: 16px;
  line-height: 2;
  color: #666;
  b { color: #333; margin-right: 10px; }
`;

export const divider = css`
  border: none;
  border-top: 1.5px solid #f0f0f0;
  margin: 40px 0;
`;

export const subTitle = css`
  color: #599afd;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 20px;
`;

export const statusText = css`
  color: #999;
  font-size: 15px;
  p { margin-bottom: 8px; }
`;

export const timeTitle = css`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #333;
`;

export const timeDisplay = css`
  font-size: 36px;
  font-weight: 900;
  color: #599afd;
  margin-bottom: 20px;
`;

export const graphBox = css`
  background: #fafafa;
  border-radius: 25px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const timeGrid = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  margin-bottom: 10px;
  span { font-size: 11px; color: #ccc; font-weight: 600; }
`;

export const barWrapper = css`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const barRow = css`
  flex: 1;
  height: 14px;
  background: #eee;
  border-radius: 7px;
  position: relative;
`;

export const barLabel = css`
  width: 100px;
  font-size: 13px;
  color: #999;
  font-weight: 600;
  white-space: nowrap;
`;

export const activeBar = (color, width, left) => css`
  position: absolute;
  left: ${left}%;
  width: ${width}%;
  height: 100%;
  background-color: ${color};
  border-radius: 7px;
  opacity: 0.8;
`;

export const legendArea = css`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px dashed #ddd;
`;

export const legendItem = (color) => css`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  &::before {
    content: '';
    width: 12px;
    height: 12px;
    background-color: ${color};
    border-radius: 50%;
  }
`;

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalContent = css`
  background-color: white;
  padding: 40px;
  border-radius: 40px;
  width: 400px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

export const modalTitle = css`
  font-size: 24px;
  font-weight: 800;
  color: #333;
  margin-bottom: 10px;
`;

export const modalInfo = css`
  color: #666;
  margin-bottom: 20px;
  b { color: #599afd; }
`;

export const modalImageArea = css`
  width: 100%;
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 25px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #bbb;
`;

export const modalButton = css`
  width: 100%;
  padding: 15px;
  background-color: #599afd;
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #4a89e8;
  }
`;