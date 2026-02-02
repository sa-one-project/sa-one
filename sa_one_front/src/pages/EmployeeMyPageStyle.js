/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import cloudImg from "../assets/andrew-knechel-kotj0vwusAg-unsplash.jpg";

export const Container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: #f5f8ff;
    min-height: 100vh;
`;

export const Card = css`
    width: 1200px;
    min-height: 700px;
    background: white;
    border-radius: 40px;
    display: flex;
    padding: 30px 60px 60px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
    position: relative;
    gap: 40px;
`;

export const LeftSection = css`
    flex: 2;
    display: flex;
    flex-direction: column;
`;

export const Title = css`
    color: #b1afff;
    font-size: 36px;
    margin-top: 0; 
    margin-bottom: 5px;
    font-weight: 400;
`;

export const StoreSelect = css`
    display: inline-flex;
    align-items: center;
    border: 1px solid #b1afff;
    border-radius: 8px;
    padding: 5px 15px;
    color: #8a88f5;
    font-weight: 600;
    margin-bottom: 20px;
    width: fit-content;
    gap: 10px;
    font-size: 20px;
    span { color: #8a88f5; }
`;

export const ContentBody = css`
    display: flex;
    gap: 50px;
    align-items: flex-start;
    margin-top: -25px;
`;

export const ProfileSection = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ProfileBox = css`
    width: 200px;
    height: 200px;
    border: 1px solid #d0d0d0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    color: #999;
    font-size: 14px;
    img { width: 100%; height: 100%; object-fit: cover; }
`;

export const ImageChangeBtn = css`
    background-color: #eee9ff;
    border: none;
    border-radius: 15px;
    padding: 6px 20px;
    color: #8a88f5;
    font-size: 13px;
    cursor: pointer;
    font-weight: 600;
`;

export const FormGrid = css`
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    row-gap: 18px;
    margin-top: 25px;
`;

export const InputGroup = css`
    display: flex;
    align-items: center;
    gap: 15px;
    label {
        width: 60px;
        color: #8a88f5;
        font-weight: bold;
        font-size: 15px;
        white-space: nowrap;
    }
    input, select {
        flex: 1;
        height: 32px;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        padding: 0 12px;
        outline: none;
        font-size: 14px;
        color: #666;
    }
    .with-btn {
        flex: 1;
        display: flex;
        position: relative;
        input { padding-right: 45px; }
        button {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #bbb;
            font-size: 12px;
            cursor: pointer;
            padding-left: 10px;
            border-left: 1px solid #eee;
        }
    }
`;

export const RightSection = css`
    flex: 1.5;
    background-image: url(${cloudImg});
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    margin: -10px 0;
`;

export const Footer = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: auto;
    width: 100%;
`;

export const WithdrawBtn = css`
    background: none;
    border: none;
    color: #ff4d4f;
    text-decoration: underline;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
`;

export const CloseButton = css`
    padding: 12px 60px;
    background-color: #eee9ff;
    border: none;
    border-radius: 25px;
    color: #444;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;