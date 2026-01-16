import React, { useEffect, useState } from "react";
import axios from "axios";

function MyPage() {
    const [userInfo, setUserInfo] = useState(null);

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
            } catch (error) {
                console.error("마이페이지 정보를 불러오지 못했습니다.", error);
            }
        };

        fetchUserData();
    }, []);

    if (!userInfo) return <div>사용자 정보를 불러오는 중...</div>;

    return (
        <div>
            <h1>마이페이지</h1>

            <div>
                {/* 1. 기본 정보: UserEntity 데이터 매핑 */}
                <section>
                    <h2>기본 정보</h2>
                    <div>
                        <img src={userInfo.imgUrl || "기본이미지경로"} alt="프로필" />
                        <button>이미지 변경</button>
                    </div>

                    <div>
                        <label>이름</label>
                        <input type="text" value={userInfo.name || ""} readOnly />
                    </div>
                    <div>
                        <label>성별</label>
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

                {/* 2. 사업자 정보: 현재 UserEntity에 없는 필드들 (하드코딩 혹은 대기) */}
                <section>
                    <h2>사업자 정보</h2>
                    <div>
                        <label>사업장 선택</label>
                        <select>
                            <option>1호점</option>
                            <option>2호점</option>
                        </select>
                    </div>
                    <div>
                        <label>상호명</label>
                        <input type="text" placeholder="사업자 테이블 연동 필요" />
                    </div>
                    <div>
                        <label>사업자 등록번호</label>
                        <input type="text" />
                    </div>
                </section>

                {/* 3. 사업장 정보: 현재 UserEntity에 없는 필드들 */}
                <section>
                    <h2>사업장 정보</h2>
                    <div>
                        <label>특례사항</label>
                        <select>
                            <option>없음</option>
                            <option>우선지원대상 기업</option>
                        </select>
                    </div>
                    <div>
                        <label>업종명</label>
                        <input type="text" />
                    </div>
                </section>
            </div>

            <button onClick={() => window.history.back()}>닫기</button>
        </div>
    );
}

export default MyPage;