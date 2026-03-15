/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const page = css`
  padding: 40px;
  background-color: #f2f7fc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

export const card = css`
  width: 100%;
  max-width: 1200px;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #e1e4e8;
  padding: 34px;
  height: fit-content;
`;

export const topBar = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const backBtn = css`
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #111827;
  font-weight: 900;
  cursor: pointer;
`;

export const title = css`
  margin: 0;
  font-size: 22px;
  font-weight: 900;
  color: #111827;
`;

export const metaGrid = css`
  margin-top: 10px;
  border: 1px solid #eef0f2;
  border-radius: 16px;
  padding: 14px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  color: #374151;
  font-weight: 800;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  .muted {
    color: #6b7280;
    font-weight: 800;
  }
`;

export const contentBox = css`
  margin-top: 16px;
  border: 1px solid #eef0f2;
  border-radius: 16px;
  padding: 16px;
  background: #fff;
  color: #111827;
  font-weight: 700;
  white-space: pre-wrap;
  line-height: 1.55;
`;

export const actionRow = css`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

export const select = css`
  height: 42px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-weight: 800;
  color: #111827;
  outline: none;
`;

export const btn = css`
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #111827;
  color: #fff;
  font-weight: 900;
  cursor: pointer;
`;

export const sectionTitle = css`
  margin: 22px 0 12px;
  font-size: 16px;
  font-weight: 900;
  color: #111827;
`;

export const commentList = css`
  display: grid;
  gap: 10px;
`;

export const commentItem = css`
  border: 1px solid #eef0f2;
  border-radius: 16px;
  padding: 14px;
  background: #fff;

  .head {
    font-size: 12px;
    font-weight: 900;
    color: #6b7280;
    margin-bottom: 8px;
  }

  .body {
    white-space: pre-wrap;
    font-weight: 700;
    color: #111827;
    line-height: 1.55;
  }
`;

export const editor = css`
  margin-top: 14px;
  border: 1px solid #eef0f2;
  border-radius: 16px;
  padding: 14px;
  background: #fff;
  display: grid;
  gap: 10px;

  textarea {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px;
    font-weight: 700;
    outline: none;
    resize: vertical;
    min-height: 110px;
  }

  .row {
    display: flex;
    justify-content: flex-end;
  }
`;

export const state = css`
  width: 100%;
  max-width: 1200px;
  padding: 30px;
  text-align: center;
  color: #6b7280;
  font-weight: 800;

  &.error {
    color: #ef4444;
  }
`;