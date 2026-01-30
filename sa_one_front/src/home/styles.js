/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import contentBg from "../assets/content.png"; 

// 테두리 광채 회전 애니메이션
const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

export const container = css`
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
    font-family: 'Pretendard', sans-serif;
`;

export const navBar = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 8%;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 1000;
`;

export const logo = css`
    font-size: 24px;
    font-weight: 900;
    cursor: pointer;
    background: linear-gradient(to right, #98e9f0, #c3c2ed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const navButtons = css`
    display: flex;
    gap: 12px;
`;

export const button = (variant) => css`
    padding: 10px 22px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;

    ${variant === 'primary' && `
        background-color: #c3c2ed; 
        color: #ffffff;
        &:hover { opacity: 0.9; transform: translateY(-1px); }
    `}

    ${variant === 'ghost' && `
        background-color: transparent;
        color: #000;
    `}

    ${variant === 'outline' && `
        background-color: #f1f5f9;
        color: #94a3b8;
    `}
`;

export const heroSection = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 20px;
    overflow: hidden;
    min-height: 80vh;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${contentBg});
        background-size: cover;
        background-position: center;
        filter: blur(5px); 
        opacity: 0.5; 
        transform: scale(1.3);
        z-index: 0;
    }

    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: center;
        padding: 140px 10%;
        gap: 100px;
    }
`;

export const heroTextContent = css`
    max-width: 520px;
    text-align: left;
    position: relative;
    z-index: 1;

    .badge {
        display: inline-block;
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(195, 194, 237, 0.5);
        color: #8a88d8;
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 800;
        margin-bottom: 20px;
    }

    h1 {
        font-size: 58px;
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 25px;
        letter-spacing: -2px;
        color: #1e293b;

        span {
            background: linear-gradient(to right, #8a88d8, #60a5fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    p {
        font-size: 18px;
        color: #475569;
        font-weight: 600;
        line-height: 1.6;
        margin-bottom: 35px;
    }
`;

export const heroCard = css`
    position: relative; 
    background: #ffffff;
    padding: 35px;
    border-radius: 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.03);
    width: 100%;
    max-width: 380px;
    overflow: hidden; 
    z-index: 1;

    &::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(
            transparent, 
            #c3c2ed,
            transparent 30%
        );
        animation: ${rotate} 4s linear infinite;
        z-index: -2;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 4px; 
        background: white;
        border-radius: 36px;
        z-index: -1;
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 35px;
    }

    .profile-icon {
        width: 55px; height: 55px;
        background-color: #f1f5f9;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        color: #cbd5e1; font-size: 28px;
    }

    .header-text {
        flex: 1;
        h4 { font-size: 17px; font-weight: 800; margin: 0; }
        span { font-size: 13px; color: #cbd5e1; font-weight: 600; }
    }

    .check-icon { color: #e2e8f0; font-size: 24px; }

    .stats-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 25px;
    }

    .stat-box {
        padding: 22px;
        border-radius: 20px;
        text-align: center;
        strong { font-size: 28px; display: block; margin-bottom: 5px; }
        span { font-size: 12px; font-weight: 700; opacity: 0.8; }
        &.blue { background-color: #eff6ff; color: #60a5fa; }
        &.purple { background-color: #f8f7ff; color: #c3c2ed; }
    }

    .card-footer {
        text-align: center;
        font-size: 11px;
        font-weight: 800;
        color: #c3c2ed;
        letter-spacing: 2px;
    }
`;

export const featuresSection = css`
    padding: 120px 20px;
    background-color: #f2f7fc;
    position: relative;
    z-index: 1;
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
        max-width: 1100px;
        margin: 0 auto;
    }
`;

export const featureCard = css`
    background-color: #ffffff;
    padding: 40px;
    border-radius: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); 
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-8px) scale(1.03);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    }
    
    .icon {
        width: 48px; height: 48px;
        border-radius: 14px;
        display: flex; justify-content: center; align-items: center;
        font-size: 20px;
        margin-bottom: 20px;
    }

    &.purple .icon { background-color: #f8f7ff; color: #c3c2ed; }
    &.green .icon { background-color: #f0fdf4; color: #4ade80; }
    &.pink .icon { background-color: #fdf2f8; color: #f472b6; }
    &.blue .icon { background-color: #eff6ff; color: #60a5fa; }

    h3 { font-size: 19px; font-weight: 800; margin-bottom: 12px; }
    p { color: #64748b; font-size: 14px; line-height: 1.6; }
`;

export const footer = css`
    padding: 60px;
    text-align: center;
    color: #cbd5e1;
    font-size: 14px;
`;