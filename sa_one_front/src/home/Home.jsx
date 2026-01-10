import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        alert("로그아웃 되었습니다.");
        navigate("/login");
    };

    return (
        <div>
            <h1>메인 페이지</h1>
            <p>로그인 성공한 사람만 보이는 화면</p>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default Home;