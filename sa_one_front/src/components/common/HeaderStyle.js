    import { css } from "@emotion/react";

export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 80px;
    height: 70px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
`;

export const logo = css`
    font-size: 28px;
    font-weight: 900;
    text-decoration: none;
    
    background: linear-gradient(to right, #A7D7E8, #9370DB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const nav = css`
    display: flex;
    align-items: center;
    gap: 35px;

    a {
        text-decoration: none;
        color: #333;
        font-weight: 700;
        font-size: 17px;

        &.active {
            color: #9370DB;
        }
    }

    .logout-btn {
        background-color: #f5f5f5;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 700;
        color: #555;
        cursor: pointer;
        margin-left: 10px;
    }
`;

export const startBtn = css`
    background-color: #8E97FD;
    color: white !important;
    padding: 8px 20px;
    border-radius: 20px;
`;