import React from "react";
import { useNavigate } from "react-router-dom";

function StartPage() {
    const navigate = useNavigate();

    // ★ 나중에 스타일을 입히기 쉽게 구역만 나눠둠
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh', // 화면 중앙쯤 오도록 설정
        gap: '20px'
    };

    return (
        <div style={containerStyle}>
            {/* 로고 영역 - 피그마의 SA : ONE 로고가 들어갈 자리 */}
            <h1 style={{ fontSize: '48px', color: '#a3b6ee' }}>SA : ONE</h1>

            {/* 버튼 영역 - 로그인 또는 회원가입 선택 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {/* ★ 로그인 페이지로 이동 */}
                <button 
                    onClick={() => navigate('/login')} 
                    style={{ width: '250px', padding: '15px', cursor: 'pointer' }}
                >
                    로그인
                </button>

                {/* ★ 회원가입 페이지로 이동 */}
                <button 
                    onClick={() => navigate('/signup')} 
                    style={{ width: '250px', padding: '15px', cursor: 'pointer' }}
                >
                    회원가입
                </button>
                
            </div>

            {/* ★ 뒤로가기 혹은 안내 문구 구역 */}
            <p style={{ color: '#888', fontSize: '14px' }}>
                처음이신가요? 회원가입을 통해 서비스를 시작하세요.
            </p>
        </div>
    );
}

export default StartPage;