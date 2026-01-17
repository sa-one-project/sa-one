import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeAdd() {
    const navigate = useNavigate();

    // 데이터 상태 관리
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        birthDate: "", // Date 타입으로 받아오기
        imgUrl: "",
        // gender 는 마이페이지 수정에 없어서 삭제

        // 피그마에는 있지만 Dto 에는 없는 항목
        employeeNumber: "", // 사번
        hourlyRate: "", // 시급
        address: "", // 주소
        hireDate: "", // 입사일
        employmentType: "정규직" // 기본값 정규직
    });

    // ★ 에러 방지를 위해 누락된 스타일 변수 정의
    const rowStyle = { display: "flex", gap: "15px", marginBottom: "15px" };
    const inputBox = { display: "flex", flexDirection: "column", flex: 1 };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("백엔드로 보낼 데이터: ", formData);
    };

    return (
        <div style={{ padding: "30px", maxWidth: "800px" }}>
            <h2> 직원 추가 </h2>
            <hr />

            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "30px" }}>
                
                {/* 1. 왼쪽: 이미지 업로드 섹션 */}
                <div style={{ width: "200px", textAlign: "center" }}>
                    <div style={{ width: "150px", height: "180px", backgroundColor: "#eee", margin: "0 auto 10px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        이미지 미리보기
                    </div>
                    <input type="file" style={{ width: "100%" }} />
                </div>

                {/* 2. 오른쪽: 상세 정보 입력 섹션 */}
                <div style={{ flex: 1 }}>
                    <div style={rowStyle}>
                        <div style={inputBox}>
                            <label>이름</label>
                            <input name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div style={inputBox}>
                            <label>생년월일</label>
                            {/* 여기서 선택한 값은 "2026-01-16" 형태의 문자열로 저장됩니다. */}
                            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={rowStyle}>
                        <div style={inputBox}>
                            <label>아이디</label>
                            <input name="username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div style={inputBox}>
                            <label>비밀번호</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={inputBox}>
                        <label>주소</label>
                        <input name="address" value={formData.address} onChange={handleChange} style={{ width: "100%" }} />
                    </div>

                    <div style={rowStyle}>
                        <div style={inputBox}>
                            <label>이메일</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div style={inputBox}>
                            <label>연락처</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={{ ...rowStyle, backgroundColor: "#f4f4f4", padding: "15px", marginTop: "10px" }}>
                        <div style={inputBox}>
                            <label>사번</label>
                            <input name="employeeNumber" value={formData.employeeNumber} onChange={handleChange} />
                        </div>
                        <div style={inputBox}>
                            <label>시급</label>
                            <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} />
                        </div>
                        <div style={inputBox}>
                            <label>입사일</label>
                            <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} />
                        </div>
                        {/* 고용형태 선택 기능 추가 */}
                        <div style={inputBox}>
                            <label>고용형태</label>
                            <select 
                                name="employmentType" 
                                value={formData.employmentType} 
                                onChange={handleChange}
                                style={{ height: "30px" }}
                            >
                                <option value="정규직">정규직</option>
                                <option value="계약직">계약직</option>
                                <option value="알바">알바</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <button type="submit" style={{ padding: "10px 25px", cursor: "pointer" }}>저장</button>
                        <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>취소</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EmployeeAdd;