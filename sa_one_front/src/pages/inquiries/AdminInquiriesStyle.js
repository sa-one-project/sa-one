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

export const headerRow = css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 900;
    color: #111827;
  }

  .sub {
    margin: 6px 0 0;
    color: #6b7280;
    font-weight: 600;
    font-size: 13px;
  }
`;

export const toolbar = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 18px 0 18px;
`;

export const select = css`
  height: 42px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-weight: 700;
  color: #111827;
  outline: none;
`;

export const input = css`
  height: 42px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-weight: 700;
  color: #111827;
  outline: none;
  min-width: 260px;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const btnGhost = css`
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #111827;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const tableWrap = css`
  border: 1px solid #eef0f2;
  border-radius: 16px;
  overflow: hidden;
`;

export const tableHead = css`
  display: grid;
  grid-template-columns: 90px 140px 1fr 160px 180px;
  gap: 10px;
  padding: 12px 14px;
  background: #f9fafb;
  color: #6b7280;
  font-size: 12px;
  font-weight: 900;
  border-bottom: 1px solid #eef0f2;
`;

export const row = css`
  display: grid;
  grid-template-columns: 90px 140px 1fr 160px 180px;
  gap: 10px;
  padding: 14px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #eef0f2;

  &:hover {
    background: #fafafa;
  }

  &:last-of-type {
    border-bottom: none;
  }

  .title {
    font-weight: 900;
    color: #111827;
    margin-bottom: 4px;
  }

  .meta {
    font-weight: 700;
    color: #6b7280;
    font-size: 12px;
  }
`;

export const badge = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #374151;

  &.OPEN {
    border-color: rgba(239, 68, 68, 0.25);
    background: rgba(239, 68, 68, 0.08);
    color: #b91c1c;
  }

  &.IN_PROGRESS {
    border-color: rgba(245, 158, 11, 0.25);
    background: rgba(245, 158, 11, 0.10);
    color: #92400e;
  }

  &.CLOSED {
    border-color: rgba(34, 197, 94, 0.25);
    background: rgba(34, 197, 94, 0.08);
    color: #15803d;
  }
`;

export const footer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  color: #6b7280;
  font-weight: 800;
`;

export const state = css`
  margin-top: 12px;
  color: #6b7280;
  font-weight: 800;

  &.error {
    color: #ef4444;
  }
`;