/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./PayrollStyle";

function PayrollDetail() {
    const [isOwner, setIsOwner] = useState(true); 
    const [isEditMode, setIsEditMode] = useState(false); 
    
    const [stores, setStores] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null); 
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    
    const [isStoreListOpen, setIsStoreListOpen] = useState(false);
    const [isEmployeeListOpen, setIsEmployeeListOpen] = useState(false);
    const [openSections, setOpenSections] = useState({
        tax: true,
        insurance: true
    });

    const [values, setValues] = useState({
        insurance: "0",     
        weekly: "0",        
        tax: "0",           
        extra: "0",         
        totalWorkTime: "0", 
        attendanceIssue: "0", 
        totalDeduction: "0",  
        insuranceDeduction: "0" 
    });

    const [details, setDetails] = useState({
        incomeTax: "0",      
        localIncomeTax: "0", 
        nationalPension: "0", 
        healthInsurance: "0", 
        employmentInsurance: "0", 
        industrialInsurance: "0"  
    });

    const getAuthHeader = () => {
        const token = localStorage.getItem("accessToken");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get("/stores/me", { headers: getAuthHeader() });
                const storeData = Array.isArray(response.data) ? response.data : [];
                setStores(storeData);
                if (storeData.length > 0) setSelectedStore(storeData[0]);
            } catch (error) {
                console.error("매장 목록 로드 실패", error);
            }
        };
        fetchStores();
    }, []);

    useEffect(() => {
        if (!selectedStore?.storeId) return;
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`/api/employees`, { 
                    params: { storeId: selectedStore.storeId },
                    headers: getAuthHeader()
                });
                const empData = Array.isArray(response.data) ? response.data : [];
                setEmployees(empData);
                if (empData.length > 0) setSelectedEmployee(empData[0]);
                else setSelectedEmployee(null);
            } catch (error) {
                console.error("직원 정보 로드 실패", error);
            }
        };
        fetchEmployees();
    }, [selectedStore, isOwner]);

    const handleSave = async () => {
        if (!selectedEmployee || !selectedStore) {
            alert("매장과 직원을 선택해야 저장할 수 있습니다.");
            return;
        }

        try {
            const payload = {
                storeId: selectedStore.storeId,
                userId: selectedEmployee.userId,
                yearMonth: "2024-05", 
                ...values,
                ...details
            };

            await axios.post("/api/payrolls/save", payload, { headers: getAuthHeader() });
            alert("급여명세서가 저장되었습니다.");
            setIsEditMode(false);
        } catch (error) {
            console.error("저장 실패", error);
            alert("저장 중 오류가 발생했습니다.");
        }
    };

    const handleInputChange = (e, key, isDetail = false) => {
        const val = e.target.value.replace(/[^0-9]/g, ""); 
        if (isDetail) {
            setDetails(prev => ({ ...prev, [key]: val }));
        } else {
            setValues(prev => ({ ...prev, [key]: val }));
        }
    };

    const format = (val) => Number(val || 0).toLocaleString();
    const canEdit = isOwner && isEditMode;

    return (
        <div css={S.container}>
            <button onClick={() => { setIsOwner(!isOwner); setIsEditMode(false); }} 
                style={{ position: 'fixed', top: '20px', left: '20px', padding: '10px 15px', background: isOwner ? '#7c98b6' : '#8a7ab0', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', zIndex: 1000, fontWeight: 'bold' }}>
                {isOwner ? "현재: 사장님 모드" : "현재: 직원 모드"}
            </button>

            <div css={S.card}>
                <div css={S.header(isOwner)}>
                    <div className="select-wrapper" onClick={() => setIsStoreListOpen(!isStoreListOpen)} style={{ position: 'relative', cursor: 'pointer' }}>
                        {selectedStore ? selectedStore.storeName : "매장 없음"} <span>▼</span>
                        {isStoreListOpen && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: '#fff', border: '1px solid #ddd', zIndex: 10, color: '#333' }}>
                                {stores.length > 0 ? (
                                    stores.map(store => (
                                        <div key={store.storeId} onClick={() => { setSelectedStore(store); setIsStoreListOpen(false); }} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{store.storeName}</div>
                                    ))
                                ) : (
                                    <div style={{ padding: '10px', color: '#999' }}>등록된 매장이 없습니다.</div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <div className="select-wrapper" onClick={() => isOwner && setIsEmployeeListOpen(!isEmployeeListOpen)} 
                        style={{ position: 'relative', cursor: isOwner ? 'pointer' : 'default', background: isOwner ? '#fff' : '#f5f5f5' }}>
                        {selectedEmployee ? selectedEmployee.name : "직원 없음"} {isOwner && <span> ▼</span>}
                        {isOwner && isEmployeeListOpen && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: '#fff', border: '1px solid #ddd', zIndex: 10, color: '#333' }}>
                                {employees.length > 0 ? (
                                    employees.map(emp => (
                                        <div key={emp.userId} onClick={() => { setSelectedEmployee(emp); setIsEmployeeListOpen(false); }} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{emp.name}</div>
                                    ))
                                ) : (
                                    <div style={{ padding: '10px', color: '#999' }}>등록된 직원이 없습니다.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {isOwner && (
                    <button css={S.editBtn} onClick={isEditMode ? handleSave : () => setIsEditMode(true)}>
                        {isEditMode ? "저장" : "수정"}
                    </button>
                )}

                <div css={S.titleBar(isOwner)}>급여명세서</div>

                <div css={S.grid}>
                    <div css={S.rowItem(isOwner)}>
                        <div className="main-row"><div className="label">사대보험 <span>▼</span></div><input value={canEdit ? values.insurance : format(values.insurance)} onChange={(e) => handleInputChange(e, "insurance")} disabled={!canEdit} /></div>
                    </div>
                    <div css={S.rowItem(isOwner)}>
                        <div className="main-row"><div className="label">주휴수당 <span>▼</span></div><input value={canEdit ? values.weekly : format(values.weekly)} onChange={(e) => handleInputChange(e, "weekly")} disabled={!canEdit} /></div>
                    </div>
                    <div css={S.rowItem(isOwner)}>
                        <div className="main-row"><div className="label">원천징수</div><input value={canEdit ? values.tax : format(values.tax)} onChange={(e) => handleInputChange(e, "tax")} disabled={!canEdit} /></div>
                    </div>
                    <div css={S.rowItem(isOwner)}>
                        <div className="main-row"><div className="label">초과수당</div><input value={canEdit ? values.extra : format(values.extra)} onChange={(e) => handleInputChange(e, "extra")} disabled={!canEdit} /></div>
                    </div>
                </div>

                <div css={S.detailBox(isOwner)}>
                    <div className="box-header" onClick={() => setOpenSections(p => ({...p, tax: !p.tax}))}>세금 <span>{openSections.tax ? "▲" : "▼"}</span></div>
                    {openSections.tax && (
                        <div className="box-content">
                            <div className="item"><span>소득세</span><b>{canEdit ? <input value={details.incomeTax} onChange={(e) => handleInputChange(e, "incomeTax", true)} style={{width: '80px', textAlign: 'right'}} /> : format(details.incomeTax)}</b></div>
                            <div className="item"><span>지방소득세</span><b>{canEdit ? <input value={details.localIncomeTax} onChange={(e) => handleInputChange(e, "localIncomeTax", true)} style={{width: '80px', textAlign: 'right'}} /> : format(details.localIncomeTax)}</b></div>
                            <div className="item"><span>총 세금공제액</span><b>{format(Number(details.incomeTax) + Number(details.localIncomeTax))}</b></div>
                        </div>
                    )}
                </div>

                <div css={S.detailBox(isOwner)}>
                    <div className="box-header" onClick={() => setOpenSections(p => ({...p, insurance: !p.insurance}))}>4대보험 <span>{openSections.insurance ? "▲" : "▼"}</span></div>
                    {openSections.insurance && (
                        <div className="box-content">
                            <div className="item"><span>국민연금</span><b>{canEdit ? <input value={details.nationalPension} onChange={(e) => handleInputChange(e, "nationalPension", true)} style={{width: '80px', textAlign: 'right'}} /> : format(details.nationalPension)}</b></div>
                            <div className="item"><span>건강보험</span><b>{canEdit ? <input value={details.healthInsurance} onChange={(e) => handleInputChange(e, "healthInsurance", true)} style={{width: '80px', textAlign: 'right'}} /> : format(details.healthInsurance)}</b></div>
                            <div className="item"><span>고용보험</span><b>{canEdit ? <input value={details.employmentInsurance} onChange={(e) => handleInputChange(e, "employmentInsurance", true)} style={{width: '80px', textAlign: 'right'}} /> : format(details.employmentInsurance)}</b></div>
                            <div className="item"><span>산재보험</span><b>{canEdit ? <input value={details.industrialInsurance} onChange={(e) => handleInputChange(e, "industrialInsurance", true)} style={{width: '80px', textAlign: 'right'}} /> : format(details.industrialInsurance)}</b></div>
                        </div>
                    )}
                </div>

                <div css={S.grid}>
                    <div css={S.rowItem(isOwner)}>
                        <div className="main-row"><div className="label">총 근무시간</div><input value={canEdit ? values.totalWorkTime : format(values.totalWorkTime)} onChange={(e) => handleInputChange(e, "totalWorkTime")} disabled={!canEdit} /></div>
                    </div>
                    <div css={S.rowItem(isOwner)}>
                        <div className="main-row"><div className="label">지각/결근/조회</div><input value={canEdit ? values.attendanceIssue : format(values.attendanceIssue)} onChange={(e) => handleInputChange(e, "attendanceIssue")} disabled={!canEdit} /></div>
                    </div>
                    <div css={S.rowItem(isOwner)}>
                        <div className="main-row"><div className="label">총 감액</div><input value={canEdit ? values.totalDeduction : format(values.totalDeduction)} onChange={(e) => handleInputChange(e, "totalDeduction")} disabled={!canEdit} /></div>
                    </div>
                    <div css={S.rowItem(isOwner)}>
                        <div className="main-row"><div className="label">총 보험공제액</div><input value={canEdit ? values.insuranceDeduction : format(values.insuranceDeduction)} onChange={(e) => handleInputChange(e, "insuranceDeduction")} disabled={!canEdit} /></div>
                    </div>
                </div>

                <div style={{ padding: '20px', fontSize: '14px', borderTop: '1px solid #eee', marginTop: '10px' }}>
                    <div>계산</div>
                    <div>총 지급액: {format(Number(values.weekly) + Number(values.extra))}</div>
                    <div>총 공제액: {format(Number(values.tax) + Number(values.insurance))}</div>
                    <div style={{ paddingLeft: '10px' }}>- 총 감액: {format(values.totalDeduction)}</div>
                </div>

                <div css={S.totalSection(isOwner)}>
                    <div className="total-card">
                        <div className="label">실수령액</div>
                        <div className="value">{format(Number(values.weekly) + Number(values.extra) - Number(values.insurance) - Number(values.tax) - Number(values.totalDeduction))}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayrollDetail;