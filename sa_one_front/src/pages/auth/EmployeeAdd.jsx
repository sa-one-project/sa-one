/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./EmployeeAddStyle";

function EmployeeAdd() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    address: "",
    email: "",
    phone: "",
    imgUrl: "",
    imgPath: "",
    employeeNo: "",    // 백엔드: employeeNo
    joinDate: "",      // 백엔드: joinDate
    positionName: "정규직", // 백엔드: positionName
    payType: "시급",    // 백엔드: payType
    hourlyRate: 0,     // 백엔드: hourlyRate (int)
    monthlySalary: 0   // 백엔드: monthlySalary (int)
  });

  const [employeeList, setEmployeeList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/employees");
      const data = res.data.employees || res.data;
      setEmployeeList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("목록 로딩 실패:", err);
      setEmployeeList([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        hourlyRate: parseInt(formData.hourlyRate || 0),
        monthlySalary: parseInt(formData.monthlySalary || 0)
      };

      await axios.post("/api/employees", submitData);
      alert("직원 정보가 저장되었습니다.");
      fetchEmployees();
      
      // 입력창 초기화
      setFormData({
        name: "", birthDate: "", address: "", email: "", phone: "",
        imgUrl: "", imgPath: "", employeeNo: "", joinDate: "",
        positionName: "정규직", payType: "시급", hourlyRate: 0, monthlySalary: 0
      });
    } catch (err) {
      console.error("저장 에러 상세:", err.response?.data);
      alert("저장에 실패했습니다. 콘솔을 확인하세요.");
    }
  };

  // 체크박스 선택
  const handleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return alert("삭제할 대상을 선택하세요.");
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      for (const id of selectedIds) {
        await axios.delete(`/api/employees/${id}`);
      }
      alert("삭제 완료");
      setSelectedIds([]);
      fetchEmployees();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  return (
    <div css={S.container}>
      <div css={S.formWrapper}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div css={S.topSection}>
            <div css={S.imageSection}>
              <div css={S.previewBox}>프로필 이미지</div>
              <input type="file" />
            </div>

            <div css={S.tableGrid}>
              <div css={S.labelCell}>이름</div>
              <div css={S.inputCell}><input name="name" value={formData.name} onChange={handleChange} /></div>
              
              <div css={S.labelCell}>생년월일</div>
              <div css={S.inputCell}><input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} /></div>

              <div css={S.labelCell}>이메일</div>
              <div css={S.inputCell}><input name="email" value={formData.email} onChange={handleChange} /></div>
              
              <div css={S.labelCell}>연락처</div>
              <div css={S.inputCell}><input name="phone" value={formData.phone} onChange={handleChange} /></div>

              <div css={S.labelCell}>사번</div>
              <div css={S.inputCell}><input name="employeeNo" value={formData.employeeNo} onChange={handleChange} /></div>
              
              <div css={S.labelCell}>급여 형태</div>
              <div css={S.inputCell}>
                <select name="payType" value={formData.payType} onChange={handleChange}>
                  <option value="시급">시급</option>
                  <option value="월급">월급</option>
                </select>
              </div>

              <div css={S.labelCell}>{formData.payType}액</div>
              <div css={S.inputCell}>
                <input 
                  type="number" 
                  name={formData.payType === "시급" ? "hourlyRate" : "monthlySalary"} 
                  value={formData.payType === "시급" ? formData.hourlyRate : formData.monthlySalary} 
                  onChange={handleChange} 
                />
              </div>
              
              <div css={S.labelCell}>입사일</div>
              <div css={S.inputCell}><input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} /></div>

              <div css={S.labelCell}>고용형태</div>
              <div css={S.inputCell}>
                <select name="positionName" value={formData.positionName} onChange={handleChange}>
                  <option value="정규직">정규직</option>
                  <option value="계약직">계약직</option>
                  <option value="알바">알바</option>
                </select>
              </div>

              <div css={S.labelCell}>주소</div>
              <div css={S.inputCell} style={{ gridColumn: "span 3" }}>
                <input name="address" value={formData.address} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div css={S.buttonArea}>
            <button type="submit" css={S.saveBtn}>저장</button>
            <button type="button" css={S.cancelBtn} onClick={() => navigate(-1)}>취소</button>
          </div>
        </form>

        <div css={S.listWrapper}>
          <table css={S.listTable}>
            <thead>
              <tr>
                <th>선택</th>
                <th>이름</th>
                <th>이메일</th>
                <th>연락처</th>
                <th>사번</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.length > 0 ? (
                employeeList.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(emp.id)} 
                        onChange={() => handleSelect(emp.id)} 
                      />
                    </td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.employeeNo}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5">데이터가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
          <div css={S.listButtonArea}>
            <button type="button" css={S.saveBtn} onClick={handleDelete} style={{ width: 'auto' }}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAdd;