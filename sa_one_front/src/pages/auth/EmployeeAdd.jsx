/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./EmployeeAddStyle";
import axiosInstance from "../../apis/axiosInstance";
import { useStoreStore } from "../../stores/useStoreStore";

function EmployeeAdd() {
    const navigate = useNavigate();

    const { stores, selectedStoreId, setSelectedStoreId, fetchMyStores } = useStoreStore();

    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        address: "",
        email: "",
        phone: "",
        imgUrl: "",
        imgPath: "",
        employeeNo: "",
        joinDate: "",
        positionName: "정규직",
        payType: "시급",
        hourlyRate: 0,
        monthlySalary: 0,
    });

    const [employeeList, setEmployeeList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                await fetchMyStores();
            } catch (e) {
                console.error("매장 목록 로딩 실패:", e);
            }
        })();
    }, [fetchMyStores]);

    useEffect(() => {
        if (!selectedStoreId) return;
        fetchEmployees(selectedStoreId);
        setSelectedIds([]);
    }, [selectedStoreId]);

    const fetchEmployees = async (storeId) => {
        try {
            const res = await axiosInstance.get(`/api/store/${storeId}/employees`);
            const data = res.data;
            setEmployeeList(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("직원 목록 로딩 실패:", err);
            setEmployeeList([]);
        }
    };

    const handleStoreChange = (e) => {
        setSelectedStoreId(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedStoreId) {
            alert("매장을 먼저 선택해주세요.");
            return;
        }

        try {
            const submitData = {
                ...formData,
                hourlyRate: parseInt(formData.hourlyRate || 0),
                monthlySalary: parseInt(formData.monthlySalary || 0),
            };

            await axiosInstance.post(`/api/store/${selectedStoreId}/employees`, submitData);
            alert("직원 정보가 저장되었습니다.");

            await fetchEmployees(selectedStoreId);

            setFormData({
                name: "",
                birthDate: "",
                address: "",
                email: "",
                phone: "",
                imgUrl: "",
                imgPath: "",
                employeeNo: "",
                joinDate: "",
                positionName: "정규직",
                payType: "시급",
                hourlyRate: 0,
                monthlySalary: 0,
            });
        } catch (err) {
            console.error("직원 저장 실패:", err.response?.data || err);
            alert("저장에 실패했습니다. 콘솔을 확인하세요.");
        }
    };

    const handleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleDelete = async () => {
        if (!selectedStoreId) return alert("매장을 먼저 선택해주세요.");
        if (selectedIds.length === 0) return alert("삭제할 대상을 선택하세요.");
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axiosInstance.delete(`/api/store/${selectedStoreId}/employees`, {
                data: { storeEmployeeId: selectedIds },
            });

            alert("삭제 완료");
            setSelectedIds([]);
            await fetchEmployees(selectedStoreId);
        } catch (err) {
            console.error("직원 삭제 실패:", err.response?.data || err);
            alert("삭제 실패");
        }
    };

    return (
        <div css={S.container}>
            <div css={S.formWrapper}>
                <div style={{ marginBottom: 12 }}>
                    <select value={selectedStoreId ?? ""} onChange={handleStoreChange}>
                        <option value="" disabled>
                            매장 선택
                        </option>
                        {stores.map((s) => (
                            <option key={s.storeId} value={s.storeId}>
                                {s.storeName}
                            </option>
                        ))}
                    </select>
                </div>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                            <button type="button" onClick={handleDelete} disabled={selectedIds.length === 0}>
                                선택 삭제
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedIds(employeeList.map((e) => e.storeEmployeeId))}
                                disabled={employeeList.length === 0}
                            >
                                전체 선택
                            </button>

                            <button type="button" onClick={() => setSelectedIds([])} disabled={selectedIds.length === 0}>
                                선택 해제
                            </button>
                        </div>

                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left" }}>선택</th>
                                    <th style={{ textAlign: "left" }}>이름</th>
                                    <th style={{ textAlign: "left" }}>직원번호</th>
                                    <th style={{ textAlign: "left" }}>연락처</th>
                                    <th style={{ textAlign: "left" }}>이메일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeList.map((emp) => (
                                    <tr key={emp.storeEmployeeId}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(emp.storeEmployeeId)}
                                                onChange={() => handleSelect(emp.storeEmployeeId)}
                                            />
                                        </td>
                                        <td>{emp.name}</td>
                                        <td>{emp.employeeNo ?? "-"}</td>
                                        <td>{emp.phone ?? "-"}</td>
                                        <td>{emp.email ?? "-"}</td>
                                    </tr>
                                ))}

                                {employeeList.length === 0 && (
                                    <tr>
                                        <td colSpan={5} style={{ padding: 12 }}>
                                            직원이 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
                                <tr key={emp.storeEmployeeId}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(emp.storeEmployeeId)}
                                            onChange={() => handleSelect(emp.storeEmployeeId)}
                                        />
                                    </td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email ?? "-"}</td>
                                    <td>{emp.phone ?? "-"}</td>
                                    <td>{emp.employeeNo ?? "-"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">데이터가 없습니다.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <div css={S.listButtonArea}>
                        <button
                            type="button"
                            css={S.saveBtn}
                            onClick={handleDelete}
                            disabled={selectedIds.length === 0}
                            style={{ width: "auto" }}
                        >
                        삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
        
}

export default EmployeeAdd;


