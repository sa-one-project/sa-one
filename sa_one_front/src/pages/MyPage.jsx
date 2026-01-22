import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

function MyPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);

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

    // 입력값이 바뀔 때마다 실행되는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    // 사진 선택 시 미리보기 처리 함수
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

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
                        <img 
                            src={previewUrl || userInfo.imgUrl || "기본이미지경로"} 
                            alt="프로필" 
                            style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} 
                        />
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: "none" }} 
                            onChange={handleFileChange} 
                            accept="image/*" 
                        />
                        <button type="button" onClick={() => fileInputRef.current.click()}>이미지 변경</button>
                    </div>

                    <div>
                        <label>이름</label>
                        <input type="text" name="name" value={userInfo.name || ""} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>성별</label>
                        {/* DB gender ENUM('남','여','기타') 매핑 */}
                        <select name="gender" value={userInfo.gender || "남"} onChange={handleInputChange}>
                            <option value="남">남</option>
                            <option value="여">여</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <div>
                        <label>아이디</label>
                        <input type="text" value={userInfo.username || ""} readOnly />
                    </div>
                    <div>
                        <label>비밀번호</label>
                        {/* 기존 비밀번호를 확인하는 별도의 페이지로 이동하거나, 비밀번호 변경 페이지로 바로 이동 */}
                        <button type="button" onClick={() => navigate("/change-password")}>변경하기</button>
                    </div>
                    <div>
                        <label>생년월일</label>
                        {/* DB birth_date 매핑 */}
                        <input type="text" name="birthDate" value={userInfo.birthDate || ""} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>이메일 주소</label>
                        <input type="text" name="email" value={userInfo.email || ""} onChange={handleInputChange} />
                        <button type="button">수정</button>
                    </div>
                    <div>
                        <label>연락처</label>
                        <input type="text" name="phone" value={userInfo.phone || ""} onChange={handleInputChange} />
                        <button type="button">변경</button>
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
                                <select value={selectedStore?.companyType || "NONE"} readOnly>
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
            </div>

            <button onClick={() => window.history.back()} style={{ marginTop: "20px" }}>닫기</button>
        </div>
    );
}

export default MyPage;