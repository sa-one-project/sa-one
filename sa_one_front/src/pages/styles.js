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
  margin-bottom: 22px;

  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 900;
    color: #111827;
  }

  .sub {
    margin: 0;
    color: #6b7280;
    font-weight: 600;
    font-size: 13px;
  }
`;

export const statGrid = css`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const statCard = css`
  border: 1px solid #eef0f2;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 18px;

  .label {
    font-size: 13px;
    color: #6b7280;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .value {
    font-size: 26px;
    font-weight: 900;
    color: #111827;
    line-height: 1;
  }
`;

export const section = css`
  margin-top: 24px;

  h3 {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 900;
    color: #111827;
  }
`;

export const alertList = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const alertItem = css`
  border: 1px solid #eef0f2;
  border-radius: 14px;
  padding: 12px 14px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  .key {
    font-weight: 800;
    color: #374151;
    font-size: 14px;
  }

  .badge {
    font-size: 12px;
    font-weight: 900;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    color: #374151;
    white-space: nowrap;
  }

  &.danger .badge {
    border-color: rgba(239, 68, 68, 0.25);
    background: rgba(239, 68, 68, 0.08);
    color: #b91c1c;
  }

  &.ok .badge {
    border-color: rgba(34, 197, 94, 0.25);
    background: rgba(34, 197, 94, 0.08);
    color: #15803d;
  }
`;

export const stateBox = css`
  width: 100%;
  max-width: 1200px;
  padding: 30px;
  text-align: center;
  color: #6b7280;
  font-weight: 700;

  &.error {
    color: #ef4444;
  }
`;