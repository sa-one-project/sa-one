/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const employee = {
  container: css`
    background-color: #f0f4f9; 
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `,
  card: css`
    display: flex;
    background: white;
    padding: 60px; 
    gap: 60px;
    width: 100%;
    max-width: 1000px;
    min-height: 500px;
    border-radius: 40px; 
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    align-items: center;
  `,
  photoArea: css`
    width: 380px;
    height: 380px;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #eee;
    p { color: #bbb; font-weight: 700; }
  `,
  infoArea: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    p {
      font-size: 20px;
      font-weight: 700;
      color: #444;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between; 
    }
    hr {
      margin: 20px 0 30px 0;
      border: none;
      border-top: 1.5px solid #f1f1f1;
    }
    .sub-text {
      color: #b0b0b0; 
    }
  `,
  registerBtn: (active) => css`
    margin-top: 40px;
    align-self: flex-end; 
    padding: 10px 40px;
    border-radius: 25px; 
    background: ${active ? "#9370DB" : "#e0e0e0"};
    color: white;
    border: none;
    cursor: ${active ? "pointer" : "default"};
    font-size: 18px;
    font-weight: 800;
    transition: all 0.2s ease;
    &:hover {
      background: ${active ? "#8262c9" : "#e0e0e0"};
    }
  `
};