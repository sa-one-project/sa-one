import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

function MyPage() {
    const [userInfo, setUserInfo] = useState(null);
    // DB role_tb 기반 권한 확인 (1: 사장, 2: 직원)
    const { roleId } = useAuthStore();
    // 사장님용) 선택된 사업장 ID 상태 (기본값: 1호점 가정)
    // 매장 다중 선택 지원을 위한 코드...
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:8080/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserInfo(response.data); // UserEntity 데이터가 들어옴

                // 만약 사장님이라면? 첫 번째 매장 정보를 기본으로 설정
                if (roleId === 1 && response.data.stores) {
                    setSelectedStore(response.data.stores[0]);
                }
            } catch (error) {
                console.error("마이페이지 정보를 불러오지 못했습니다.", error);
            }
        };

        fetchUserData();
    }, [roleId]);

    if (!userInfo) return <div>사용자 정보를 불러오는 중...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>마이페이지</h1>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {/* 1. 기본 정보: UserEntity 데이터 매핑 */}
                <section style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", flex: "1", minWidth: "300px" }}>
                    <h2>기본 정보</h2>
                    <div>
                        {/* DB img_url 매핑 */}
                        <img src={userInfo.imgUrl || "기본이미지경로"} alt="프로필" style={{ width: "100px", borderRadius: "50%" }} />
                        <button>이미지 변경</button>
                    </div>

                    <div>
                        <label>이름</label>
                        <input type="text" value={userInfo.name || ""} readOnly />
                    </div>
                    <div>
                        <label>성별</label>
                        {/* DB gender ENUM('남','여','기타') 매핑 */}
                        <input type="text" value={userInfo.gender || ""} readOnly />
                    </div>
                    <div>
                        <label>아이디</label>
                        <input type="text" value={userInfo.username || ""} readOnly />
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <button>변경하기</button>
                    </div>
                    <div>
                        <label>생년월일</label>
                        {/* DB birth_date 매핑 */}
                        <input type="text" value={userInfo.birthDate || ""} readOnly />
                    </div>
                    <div>
                        <label>이메일 주소</label>
                        <input type="text" value={userInfo.email || ""} readOnly />
                        <button>수정</button>
                    </div>
                    <div>
                        <label>연락처</label>
                        <input type="text" value={userInfo.phone || ""} readOnly />
                        <button>변경</button>
                    </div>
                </section>

                {/* [권한별 분기] 사장님(Role 1)일 때만 보이는 섹션 */}
                {roleId === 1 && (
                    <>
                        {/* 2. 사업자 정보: store_tb 데이터 매핑 */}
                        <section style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", flex: "1", minWidth: "300px" }}>
                            <h2>사업자 정보</h2>
                            <div>
                                <label>사업장 선택</label>
                                <select onChange={(e) => setSelectedStore(userInfo.stores[e.target.value])}>
                                    {userInfo.stores?.map((store, index) => (
                                        <option key={store.storeId} value={index}>{store.storeName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>상호명</label>
                                {/* DB store_tb.store_name 매핑 */}
                                <input type="text" value={selectedStore?.storeName || ""} readOnly />
                            </div>
                            <div>
                                <label>사업자 등록번호</label>
                                {/* DB store_tb.business_number 매핑 */}
                                <input type="text" value={selectedStore?.businessNumber || ""} readOnly />
                            </div>
                        </section>

                        {/* 3. 사업장 정보: store_business_info_tb 데이터 매핑 */}
                        <section style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", flex: "1", minWidth: "300px" }}>
                            <h2>사업장 정보</h2>
                            <div>
                                <label>특례사항</label>
                                {/* DB store_business_info_tb.company_type 매핑 */}
                                <select value={selectedStore?.companyType || "없음"}>
                                    <option value="NONE">없음</option>
                                    <option value="PRIORITY">우선지원대상 기업</option>
                                </select>
                            </div>
                            <div>
                                <label>업종명</label>
                                {/* DB industry_tb.industry_name 매핑 */}
                                <input type="text" value={selectedStore?.industryName || ""} readOnly />
                            </div>
                        </section>
                    </>
                )}

                {/* [권한별 분기] 직원(Role 2)일 때 보이는 섹션 - 디자인 기반 추가 */}
                {roleId === 2 && userInfo.employeeInfo && (
                    <section style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", flex: "1", minWidth: "300px" }}>
                        <h2>나의 근무 정보</h2>
                        <div>
                            <label>사번</label>
                            {/* DB store_employee_tb.employee_no 매핑 */}
                            <input type="text" value={userInfo.employeeInfo.employeeNo || ""} readOnly />
                        </div>
                        <div>
                            <label>직급</label>
                            {/* DB position_tb.position_name 매핑 */}
                            <input type="text" value={userInfo.employeeInfo.positionName || ""} readOnly />
                        </div>
                        <div>
                            <label>입사일</label>
                            {/* DB store_employee_tb.join_date 매핑 */}
                            <input type="text" value={userInfo.employeeInfo.joinDate || ""} readOnly />
                        </div>
                        <div>
                            <label>현재 시급</label>
                            {/* DB pay_tb.hourly_rate 매핑 */}
                            <input type="text" value={`${userInfo.employeeInfo.hourlyRate?.toLocaleString()}원` || ""} readOnly />
                        </div>
                    </section>
                )}
            </div>

            <button onClick={() => window.history.back()} style={{ marginTop: "20px" }}>닫기</button>
        </div>
    );
}

export default MyPage;