import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";
import { useDeleteUserMutation } from "../react-query/mutations/userMutations";
import DeleteAccountModal from "../components/DeleteAccountModal";
import { useNavigate } from "react-router-dom";

function MyPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);

    const { roleId, clearAuth } = useAuthStore();
    const { mutate: deleteAccount } = useDeleteUserMutation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:8080/api/users/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserInfo(response.data);

                if (Number(roleId) === 1 && response.data.stores?.length > 0) {
                    setSelectedStore(response.data.stores[0]);
                }
            } catch (error) {
                console.error("마이페이지 정보를 불러오지 못했습니다.", error);
            }
        };
        fetchUserData();
    }, [roleId]);

    const handleDeleteClick = () => setIsModalOpen(true);

    // ★ 수정: 괄호 누락 해결 및 탈퇴 로직 정리
    const handleFinalConfirm = (password) => {
        console.log("입력한 비밀번호 검증 필요:", password);
        deleteAccount(undefined, {
            onSuccess: () => {
                alert("탈퇴 처리가 완료되었습니다.");
                clearAuth();
                localStorage.removeItem("accessToken");
                window.location.href = "/";
            }
        });
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

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
                {/* 1. 기본 정보 섹션 */}
                <section style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", flex: "1", minWidth: "300px" }}>
                    <h2>기본 정보</h2>
                    <div style={{ marginBottom: "15px" }}>
                        <img 
                            src={previewUrl || userInfo.imgUrl || "기본이미지경로"} 
                            alt="프로필" 
                            style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", display: "block", marginBottom: "10px" }} 
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

                    <div><label>이름</label> <input type="text" name="name" value={userInfo.name || ""} onChange={handleInputChange} /></div>
                    <div>
                        <label>성별</label>
                        <select name="gender" value={userInfo.gender || "남"} onChange={handleInputChange}>
                            <option value="남">남</option>
                            <option value="여">여</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <div><label>아이디</label> <input type="text" value={userInfo.username || ""} readOnly /></div>
                    <div><label>비밀번호</label> <button type="button" onClick={() => navigate("/change-password")}>변경하기</button></div>
                    <div><label>생년월일</label> <input type="text" name="birthDate" value={userInfo.birthDate || ""} onChange={handleInputChange} /></div>
                    <div><label>이메일</label> <input type="text" name="email" value={userInfo.email || ""} onChange={handleInputChange} /></div>
                    <div><label>연락처</label> <input type="text" name="phone" value={userInfo.phone || ""} onChange={handleInputChange} /></div>
                </section>

                {/* 2. 사장님 전용 섹션 */}
                {Number(roleId) === 1 && (
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
                        <div><label>상호명</label> <input type="text" value={selectedStore?.storeName || ""} readOnly /></div>
                        <div><label>업종</label> <input type="text" value={selectedStore?.industryName || ""} readOnly /></div>
                    </section>
                )}

                {/* 3. 직원 전용 섹션 */}
                {Number(roleId) === 2 && userInfo.employeeInfo && (
                    <section style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", flex: "1", minWidth: "300px" }}>
                        <h2>나의 근무 정보</h2>
                        <div><label>사번</label> <input type="text" value={userInfo.employeeInfo.employeeNo || ""} readOnly /></div>
                        <div><label>직급</label> <input type="text" value={userInfo.employeeInfo.positionName || ""} readOnly /></div>
                        <div><label>현재 시급</label> <input type="text" value={`${userInfo.employeeInfo.hourlyRate?.toLocaleString()}원`} readOnly /></div>
                    </section>
                )}
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => navigate(-1)}>닫기</button>
                <button onClick={handleDeleteClick} style={{ color: "red", cursor: "pointer", border: "none", background: "none", textDecoration: "underline" }}>
                    회원 탈퇴하기
                </button>
            </div>

            <DeleteAccountModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleFinalConfirm} 
            />
        </div>
    );
}

export default MyPage;