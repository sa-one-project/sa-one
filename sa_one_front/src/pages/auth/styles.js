/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import contentBg from "../../assets/content.png"; 

// --- 공통 배경 및 모달 (StartPage & Login 공용) ---
export const startPageContainer = css`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url(${contentBg}) no-repeat center center;
        background-size: cover;
        filter: blur(5px); 
        transform: scale(1.3);
        z-index: 1;
    }
`;

export const startModal = css`
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    width: 90%;
    max-width: 800px; 
    padding: 70px 40px;
    border-radius: 100px 0 100px 0; 
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const startLogo = css`
    font-size: 54px;
    font-weight: 900;
    margin-bottom: 50px;
    background: linear-gradient(to right, #98e9f0, #c3c2ed);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -2px;
`;

export const buttonGroup = css`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 320px;
`;

export const actionButton = (variant) => css`
    width: 100%;
    padding: 18px;
    border-radius: 15px;
    border: none;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    ${variant === 'signup' ? `
        background-color: #adc4f0;
        color: white;
    ` : `
        background-color: #f1f5f9;
        color: #94a3b8;
    `}

    &:hover {
        transform: translateY(-3px);
        filter: brightness(0.95);
    }
`;

export const description = css`
    margin-top: 30px;
    color: #94a3b8;
    font-size: 14px;
    font-weight: 500;
`;

export const loginLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    width: 100%;
`;

export const roleSidebar = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-right: 2px solid #f1f5f9;
    padding-right: 40px;
    min-width: 220px; 
    flex-shrink: 0; 

    label {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 20px;
        font-weight: 700;
        color: #cbd5e1;
        cursor: pointer;
        white-space: nowrap;

        input { display: none; }

        &.active {
            color: #8a88d8;
            &::before {
                content: "●";
                font-size: 14px;
            }
        }
    }
`;

export const formContainer = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 320px;
    min-width: 320px;
    flex-shrink: 0; 
`;

export const inputGroup = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const inputField = css`
    display: flex;
    background: #eceeff;
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    
    .label-tag {
        padding: 14px 15px;
        background: #d9dfff;
        color: #475569;
        font-weight: 800;
        min-width: 60px; 
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    input {
        border: none;
        background: transparent;
        padding: 14px;
        flex: 1;
        outline: none;
        font-weight: 600;
    }
`;

export const loginBtn = css`
    width: 100%;
    padding: 16px;
    background: #adc4f0;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 10px;
    flex-shrink: 0;
    
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); 

    &:hover { 
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(173, 196, 240, 0.4);
        filter: brightness(1.05);
    }

    &:active {
        transform: translateY(-2px);
    }
`;

export const socialBox = css`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    flex-shrink: 0;
    button {
        border: none; background: none; color: #94a3b8; font-weight: 600; cursor: pointer;
        &:hover { color: #8a88d8; }
    }
`;