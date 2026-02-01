/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";
import { useDeleteUserMutation } from "../react-query/mutations/userMutations";
import DeleteAccountModal from "../components/DeleteAccountModal";
import { useNavigate } from "react-router-dom";

import * as O from "./OwnerMyPageStyle"; 
import * as E from "./EmployeeMyPageStyle";

function MyPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    
    const [isEditingPhone, setIsEditingPhone] = useState(false);

    const { roleId, clearAuth } = useAuthStore();
    const { mutate: deleteAccount } = useDeleteUserMutation();

    const isOwner = Number(roleId) === 1;
    const S = isOwner ? O : E;

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

    const handleFinalConfirm = (password) => {
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

    if (!userInfo) return <div css={S.container}>사용자 정보를 불러오는 중...</div>;

    return (
        <div css={S.container}>
            <div css={S.formWrapper}>
                <h1 css={S.title}>마이페이지</h1>
                
                <div css={S.contentWrapper}>
                    <section css={S.card}>
                        <h2 css={S.cardTitle}>기본 정보</h2>
                        <div style={{ display: "flex" }}>
                            <div css={S.profileSection}>
                                <img src={previewUrl || userInfo.imgUrl || "/default-profile.png"} alt="프로필" />
                                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
                                <button type="button" onClick={() => fileInputRef.current.click()}>이미지 변경</button>
                            </div>
                            <div css={S.inputGroup}>
                                <div css={S.inputRow}><label>이름</label><div className="input-wrapper"><input type="text" name="name" value={userInfo.name || ""} onChange={handleInputChange} /></div></div>
                                <div css={S.inputRow}><label>성별</label><div className="input-wrapper"><select name="gender" value={userInfo.gender || "남"} onChange={handleInputChange}><option value="남">남</option><option value="여">여</option></select></div></div>
                                <div css={S.inputRow}><label>아이디</label><div className="input-wrapper"><input type="text" value={userInfo.username || ""} readOnly /></div></div>
                                <div css={S.inputRow}><label>비밀번호</label><div className="input-wrapper"><input type="password" value="********" readOnly /><button type="button" className="inner-btn" onClick={() => navigate("/change-password")}>변경하기</button></div></div>
                                <div css={S.inputRow}><label>생년월일</label><div className="input-wrapper"><input type="text" name="birthDate" value={userInfo.birthDate || ""} onChange={handleInputChange} /></div></div>
                                
                                <div css={S.inputRow}><label>이메일 주소</label><div className="input-wrapper"><input type="text" name="email" value={userInfo.email || ""} onChange={handleInputChange} /></div></div>
                                
                                <div css={S.inputRow}>
                                    <label>연락처</label>
                                    <div className="input-wrapper">
                                        <input 
                                            type="text" 
                                            name="phone" 
                                            value={userInfo.phone || ""} 
                                            onChange={handleInputChange} 
                                            readOnly={!isEditingPhone}
                                        />
                                        <button 
                                            type="button" 
                                            className="inner-btn" 
                                            onClick={() => setIsEditingPhone(!isEditingPhone)}
                                        >
                                            {isEditingPhone ? "확인" : "변경"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {isOwner && (
                        <section css={S.card}>
                            <h2 css={S.cardTitle}>사업자 정보</h2>
                            <div css={S.inputGroup}>
                                <div css={S.inputRow}><label>사업장 선택</label><div className="input-wrapper"><select onChange={(e) => setSelectedStore(userInfo.stores[e.target.value])}>{userInfo.stores?.map((store, index) => (<option key={store.storeId} value={index}>{store.storeName}</option>))}</select></div></div>
                                <div css={S.inputRow}><label>상호명</label><div className="input-wrapper"><input type="text" value={selectedStore?.storeName || ""} readOnly /></div></div>
                                <div css={S.inputRow}><label>사업자 번호</label><div className="input-wrapper"><input type="text" readOnly /></div></div>
                                <div css={S.inputRow}><label>사업장 연락처</label><div className="input-wrapper"><input type="text" readOnly /></div></div>
                                <div css={S.inputRow}><label>위치</label><div className="input-wrapper"><input type="text" readOnly /></div></div>
                            </div>
                        </section>
                    )}

                    {isOwner && (
                        <section css={S.card}>
                            <h2 css={S.cardTitle}>사업장 정보</h2>
                            <div css={S.inputGroup}>
                                <div css={S.inputRow}><label>특례사항</label><div className="input-wrapper"><select><option>없음</option><option>우선지원대상 기업</option></select></div></div>
                                <div css={S.inputRow}><label>고용보험 업종</label><div className="input-wrapper"><select><option>-</option></select></div></div>
                                <div css={S.inputRow}><label>업종명</label><div className="input-wrapper"><select><option>-</option></select></div></div>
                                <div css={S.inputRow}><label>업종 코드</label><div className="input-wrapper"><input type="text" readOnly /></div></div>
                            </div>
                        </section>
                    )}

                    {!isOwner && userInfo.employeeInfo && (
                        <section css={S.card}>
                            <h2 css={S.cardTitle}>나의 근무 정보</h2>
                            <div css={S.inputGroup}>
                                <div css={S.inputRow}><label>사번</label><div className="input-wrapper"><input type="text" value={userInfo.employeeInfo.employeeNo || ""} readOnly /></div></div>
                                <div css={S.inputRow}><label>직급</label><div className="input-wrapper"><input type="text" value={userInfo.employeeInfo.positionName || ""} readOnly /></div></div>
                                <div css={S.inputRow}><label>현재 시급</label><div className="input-wrapper"><input type="text" value={`${userInfo.employeeInfo.hourlyRate?.toLocaleString()}원`} readOnly /></div></div>
                            </div>
                        </section>
                    )}
                </div>

                <div css={S.footer}>
                    <button css={S.withdrawBtn} onClick={() => setIsModalOpen(true)}>회원 탈퇴하기</button>
                    <button css={S.mainBtn} onClick={() => navigate(-1)}>{isOwner ? "저장" : "닫기"}</button>
                    {isOwner && <button css={S.mainBtn}>매장 등록</button>}
                </div>

            </div>

            <DeleteAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleFinalConfirm} />
        </div>
    );
}

export default MyPage;