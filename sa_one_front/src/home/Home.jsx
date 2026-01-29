/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import OwnerMain from "../pages/owner/OwnerMain";
import EmployeeMain from "../pages/employee/EmployeeMain";
import * as S from "./styles"; 

import { 
    FaUserCircle, 
    FaCheckCircle, 
    FaCamera, 
    FaCalculator, 
    FaRegClock, 
    FaUsers, 
    FaFileSignature, 
    FaRegHandshake 
} from "react-icons/fa";

function Home() {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const roleId = useAuthStore((state) => state.roleId);

    if (!isLoggedIn) {
        return (
            <div css={S.container}>
                <nav css={S.navBar}>
                    <div css={S.logo} onClick={() => window.scrollTo(0, 0)}>SA : ONE</div>
                    <div css={S.navButtons}>
                        <button css={S.button('ghost')} onClick={() => navigate("/login")}>로그인</button>
                        <button css={S.button('primary')} onClick={() => navigate("/start")}>시작하기</button>
                        <button css={S.button('outline')}>마이페이지</button>
                    </div>
                </nav>

                <header css={S.heroSection}>
                    <div css={S.heroTextContent}>
                        <div className="badge">사장님을 위한 스마트 솔루션</div>
                        <h1>사장님 혼자서<br /><span>끝내는 직원 관리</span></h1>
                        <p>쉽고 빠르게 조작하여<br />어려운 직원 관리를 끝내자!</p>
                        <button css={S.button('primary')} onClick={() => navigate("/start")} style={{padding: '16px 45px'}}>지금 시작하기</button>
                    </div>

                    <div css={S.heroCard}>
                        <div className="card-header">
                            <div className="profile-icon"><FaUserCircle /></div>
                            <div className="header-text">
                                <h4>출근 인증 완료</h4>
                                <span>직원 00:00</span>
                            </div>
                            <div className="check-icon"><FaCheckCircle /></div>
                        </div>
                        <div className="stats-container">
                            <div className="stat-box blue">
                                <strong>0명</strong>
                                <span>오늘 출근</span>
                            </div>
                            <div className="stat-box purple">
                                <strong>0시간</strong>
                                <span>총 근무시간</span>
                            </div>
                        </div>
                        <div className="card-footer">SA : ONE</div>
                    </div>
                </header>

                <section css={S.featuresSection}>
                    <div className="grid">
                        <div css={S.featureCard} className="purple">
                            <div className="icon"><FaCamera /></div>
                            <h3>사진 출결 기반 인증</h3>
                            <p>직원이 출퇴근 시 사진을 촬영하여 대리 출근을 방지하고 정확한 출결 관리를 실현합니다.</p>
                        </div>
                        <div css={S.featureCard} className="green">
                            <div className="icon"><FaCalculator /></div>
                            <h3>자동 급여 계산</h3>
                            <p>근무 형태에 따라 급여를 자동으로 계산 후 명세서를 PDF로 생성합니다.</p>
                        </div>
                        <div css={S.featureCard} className="pink">
                            <div className="icon"><FaRegClock /></div>
                            <h3>실시간 출결 관리</h3>
                            <p>직원들의 출퇴근 현황을 실시간으로 확인하고 일정을 손쉽게 관리합니다.</p>
                        </div>
                        <div css={S.featureCard} className="blue">
                            <div className="icon"><FaUsers /></div>
                            <h3>통합 직원 관리</h3>
                            <p>직원 정보, 근로계약서, 매장 관리 등을 하나의 플랫폼에서 통합 관리합니다.</p>
                        </div>
                        <div css={S.featureCard} className="green">
                            <div className="icon"><FaFileSignature /></div>
                            <h3>전자 근로계약서</h3>
                            <p>API 연동을 통해 전자 서명 기능을 제공하는 근로계약서를 간편하게 작성합니다.</p>
                        </div>
                        <div css={S.featureCard} className="pink">
                            <div className="icon"><FaRegHandshake /></div>
                            <h3>투명한 관리</h3>
                            <p>사장과 직원 모두에게 투명한 근무 및 급여 정보를 제공합니다.</p>
                        </div>
                    </div>
                </section>

                <footer css={S.footer}>© 2026 SA : ONE. All rights reserved.</footer>
            </div>
        );
    }

    return <div>{Number(roleId) === 1 ? <OwnerMain /> : <EmployeeMain />}</div>;
}

export default Home;