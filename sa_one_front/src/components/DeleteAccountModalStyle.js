/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const overlay = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export const container = css`
    background: white;
    padding: 30px;
    border-radius: 15px;
    width: 350px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    text-align: center;

    h3 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1.2rem;
        color: #333;
    }

    p {
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        padding: 12px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-sizing: border-box;
        outline: none;
        &:focus {
            border-color: #7ba8d1;
        }
    }

    .btn-group {
        display: flex;
        gap: 10px;
        justify-content: center;

        button {
            flex: 1;
            padding: 10px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: bold;
        }

        .cancel-btn {
            background: #eee;
            color: #666;
        }

        .confirm-btn {
            background: #ff4d4f;
            color: white;
        }
    }
`;