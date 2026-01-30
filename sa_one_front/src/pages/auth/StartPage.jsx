/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as S from "./styles"; 

function StartPage() {
    const navigate = useNavigate();

    return (
        <div css={S.startPageContainer}>
            <div css={S.startModal}>
                <h1 css={S.startLogo}>SA : ONE</h1>

                <div css={S.buttonGroup}>
                    <button 
                        css={S.actionButton('signup')} 
                        onClick={() => navigate('/signup')}
                    >
                        회원가입
                    </button>
                    
                    <button 
                        css={S.actionButton('login')} 
                        onClick={() => navigate('/login')}
                    >
                        로그인
                    </button>
                </div>

                <p css={S.description}>
                    처음이신가요? 회원가입을 통해 서비스를 시작하세요.
                </p>
            </div>
        </div>
    );
}

export default StartPage;