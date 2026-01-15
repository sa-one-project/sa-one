import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>메인 화면</h1>
            <p>누구나 볼 수 있는 페이지</p>

            {/* App.jsx 와 path 를 똑같이 수정 */}
            <button onClick={() => navigate("/login")}>로그인</button>
            <button onClick={() => navigate("/signup")}>회원가입</button>
        </div>
    );
}

export default Home;