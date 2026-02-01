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
        if (file) { setPreviewUrl(URL.createObjectURL(file)); }
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

    if (!userInfo) return <div>사용자 정보를 불러오는 중...</div>;

    if (isOwner) {
        return (
            <div css={O.container}>
                <div css={O.formWrapper}>
                    <h1 css={O.title}>마이페이지</h1>
                    <div css={O.contentWrapper}>
                        <section css={O.card}>
                            <h2 css={O.cardTitle}>기본 정보</h2>
                            <div style={{ display: "flex" }}>
                                <div css={O.profileSection}>
                                    <img src={previewUrl || userInfo.imgUrl || "/default-profile.png"} alt="프로필" />
                                    <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
                                    <button type="button" onClick={() => fileInputRef.current.click()}>이미지 변경</button>
                                </div>
                                <div css={O.inputGroup}>
                                    <div css={O.inputRow}><label>이름</label><div className="input-wrapper"><input type="text" name="name" value={userInfo.name || ""} onChange={handleInputChange} /></div></div>
                                    <div css={O.inputRow}><label>성별</label><div className="input-wrapper"><select name="gender" value={userInfo.gender || "남"} onChange={handleInputChange}><option value="남">남</option><option value="여">여</option></select></div></div>
                                    <div css={O.inputRow}><label>아이디</label><div className="input-wrapper"><input type="text" value={userInfo.username || ""} readOnly /></div></div>
                                    <div css={O.inputRow}><label>비밀번호</label><div className="input-wrapper"><input type="password" value="********" readOnly /><button type="button" className="inner-btn" onClick={() => navigate("/change-password")}>변경하기</button></div></div>
                                    <div css={O.inputRow}><label>생년월일</label><div className="input-wrapper"><input type="text" name="birthDate" value={userInfo.birthDate || ""} onChange={handleInputChange} /></div></div>
                                    <div css={O.inputRow}><label>이메일 주소</label><div className="input-wrapper"><input type="text" name="email" value={userInfo.email || ""} onChange={handleInputChange} /></div></div>
                                    <div css={O.inputRow}>
                                        <label>연락처</label>
                                        <div className="input-wrapper">
                                            <input type="text" name="phone" value={userInfo.phone || ""} onChange={handleInputChange} readOnly={!isEditingPhone} />
                                            <button type="button" className="inner-btn" onClick={() => setIsEditingPhone(!isEditingPhone)}>{isEditingPhone ? "확인" : "변경"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section css={O.card}>
                            <h2 css={O.cardTitle}>사업자 정보</h2>
                            <div css={O.inputGroup}>
                                <div css={O.inputRow}><label>사업장 선택</label><div className="input-wrapper"><select onChange={(e) => setSelectedStore(userInfo.stores[e.target.value])}>{userInfo.stores?.map((store, index) => (<option key={store.storeId} value={index}>{store.storeName}</option>))}</select></div></div>
                                <div css={O.inputRow}><label>상호명</label><div className="input-wrapper"><input type="text" value={selectedStore?.storeName || ""} readOnly /></div></div>
                                <div css={O.inputRow}><label>사업자 번호</label><div className="input-wrapper"><input type="text" readOnly /></div></div>
                                <div css={O.inputRow}><label>사업장 연락처</label><div className="input-wrapper"><input type="text" readOnly /></div></div>
                                <div css={O.inputRow}><label>위치</label><div className="input-wrapper"><input type="text" readOnly /></div></div>
                            </div>
                        </section>
                        <section css={O.card}>
                            <h2 css={O.cardTitle}>사업장 정보</h2>
                            <div css={O.inputGroup}>
                                <div css={O.inputRow}><label>특례사항</label><div className="input-wrapper"><select><option>없음</option><option>우선지원대상 기업</option></select></div></div>
                                <div css={O.inputRow}><label>고용보험 업종</label><div className="input-wrapper"><select><option>-</option></select></div></div>
                                <div css={O.inputRow}><label>업종명</label><div className="input-wrapper"><select><option>-</option></select></div></div>
                                <div css={O.inputRow}><label>업종 코드</label><div className="input-wrapper"><input type="text" readOnly /></div></div>
                            </div>
                        </section>
                    </div>
                    <div css={O.footer}>
                        <button css={O.withdrawBtn} onClick={() => setIsModalOpen(true)}>회원 탈퇴하기</button>
                        <button css={O.mainBtn} onClick={() => navigate(-1)}>저장</button>
                        <button css={O.mainBtn}>매장 등록</button>
                    </div>
                </div>
                <DeleteAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleFinalConfirm} />
            </div>
        );
    }

    return (
        <div css={E.Container}>
            <div css={E.Card}>
                <div css={E.LeftSection}>
                    <h1 css={E.Title}>마이페이지</h1>
                    
                    <div css={E.StoreSelect}>
                        <select 
                            onChange={(e) => {
                                const store = userInfo.stores.find(s => s.storeId === Number(e.target.value));
                                setSelectedStore(store);
                            }}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'inherit',
                                fontSize: 'inherit',
                                fontWeight: 'inherit',
                                cursor: 'pointer',
                                outline: 'none',
                                appearance: 'none',
                                width: '100%'
                            }}
                        >
                            {userInfo.stores?.map((store) => (
                                <option key={store.storeId} value={store.storeId}>
                                    {store.storeName}
                                </option>
                            )) || <option>매장 정보 없음</option>}
                        </select>
                    </div>

                    <div css={E.ProfileSection}>
                        <div css={E.ProfileBox} onClick={() => fileInputRef.current.click()}>
                            {previewUrl || userInfo.imgUrl ? (
                                <img src={previewUrl || userInfo.imgUrl} alt="프로필" />
                            ) : ("프로필 이미지")}
                            <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
                        </div>
                        <button css={E.ImageChangeBtn} onClick={() => fileInputRef.current.click()}>이미지 변경</button>
                    </div>
                    <div css={E.FormGrid}>
                        <div css={E.InputGroup}><label>이름</label><input type="text" name="name" value={userInfo.name || ""} readOnly /></div>
                        <div css={E.InputGroup}><label>이메일</label><div className="with-btn"><input type="text" name="email" value={userInfo.email || ""} onChange={handleInputChange} /><button type="button">변경</button></div></div>
                        <div css={E.InputGroup}><label>아이디</label><input type="text" value={userInfo.username || ""} readOnly /></div>
                        <div css={E.InputGroup}><label>비밀번호</label><div className="with-btn"><input type="password" value="********" readOnly /><button type="button" onClick={() => navigate("/change-password")}>변경</button></div></div>
                        <div css={E.InputGroup}><label>생년월일</label><input type="text" name="birthDate" value={userInfo.birthDate || ""} onChange={handleInputChange} /></div>
                        <div css={E.InputGroup}><label>성별</label><select name="gender" value={userInfo.gender || "남"} onChange={handleInputChange}><option value="남">남</option><option value="여">여</option></select></div>
                        <div css={E.InputGroup}><label>전화번호</label><div className="with-btn"><input type="text" name="phone" value={userInfo.phone || ""} onChange={handleInputChange} /><button type="button">변경</button></div></div>
                        {userInfo.employeeInfo && (
                            <>
                                <div css={E.InputGroup}><label>사번</label><input type="text" value={userInfo.employeeInfo.employeeNo || ""} readOnly /></div>
                                <div css={E.InputGroup}><label>고용형태</label><select><option>정규직</option></select></div>
                                <div css={E.InputGroup}><label>시급</label><input type="text" value={userInfo.employeeInfo.hourlyRate?.toLocaleString() + "원"} readOnly /></div>
                                <div css={E.InputGroup}><label>입사일</label><select><option>{userInfo.employeeInfo.hireDate || "-"}</option></select></div>
                            </>
                        )}
                    </div>
                    <div css={E.Footer}>
                        <button css={E.WithdrawBtn} onClick={() => setIsModalOpen(true)}>회원 탈퇴하기</button>
                        <button css={E.CloseButton} onClick={() => navigate(-1)}>닫기</button>
                    </div>
                </div>
                <div css={E.RightSection} />
            </div>
            <DeleteAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleFinalConfirm} />
        </div>
    );
}

export default MyPage;