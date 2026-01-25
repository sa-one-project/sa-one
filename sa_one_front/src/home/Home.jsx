import { useNavigate } from "react-router-dom";
import OwnerMain from "../pages/owner/OwnerMain";
import EmployeeMain from "../pages/employee/EmployeeMain";
import { useAuthStore } from "../stores/useAuthStore";

function Home() {

    const navigate = useNavigate();
    // 로그인 여부, 역할 가져옴
    const { isLoggedIn, role } = useAuthStore();

    // 로그인을 하지 않은 상태
    if (!isLoggedIn) {
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

    return (
        <div>
            {/* roleId 가 1 이면 사장님 그 외 2... 는 직원으로 판별 */}
            {roleId === 1 ? (
                <OwnerMain /> // 사장님 메인
            ) : (
                <EmployeeMain /> // 직원 메인
            )}
        </div>
    );
}


export default Home;