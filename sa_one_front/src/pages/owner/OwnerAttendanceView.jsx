/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as S from "./OwnerAttendanceStyle";

function OwnerAttendanceView({ user }) {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const calculatePos = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const storeStart = 9;
    const storeEnd = 21;
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = storeStart * 60;
    const endMinutes = storeEnd * 60;
    return ((totalMinutes - startMinutes) / (endMinutes - startMinutes)) * 100;
  };

  const staffData = [
    { name: "아무개", startTime: "09:00", endTime: "19:00", color: "#adc9ff" },
    { name: "홍길동", startTime: "10:30", endTime: "17:00", color: "#d1c4e9" },
    { name: "김첨지", startTime: "13:00", endTime: "20:00", color: "#f3c4fb" }
  ];

  return (
    <div css={S.container}>
      <div css={S.mainCard}>
        {/* 좌측 섹션 */}
        <div css={S.leftSection}>
          <h2 css={S.title}>{user.storeName}</h2>
          <div css={S.infoArea}>
            <p><b>위치</b> 부산진구 중앙대로 000 1F</p>
            <p><b>소개</b> {user.storeName}를 소개합니다.</p>
            <p><b>휴무일</b> 1월 1일 새해 첫날, 1월 28일 정기 휴무</p>
          </div>
          <hr css={S.divider} />
          <h3 css={S.subTitle}>직원 출결 현황</h3>
          <div css={S.statusText}>
            <p>휴가: 박무개 (님)</p>
            <p>병가: 이무기 (님)</p>
          </div>
        </div>

        {/* 우측 섹션 */}
        <div css={S.rightSection}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div css={S.summaryBox(false)}>
              <span style={{ color: '#599afd', fontWeight: '800' }}>총 출근 인원</span>
              <strong>{staffData.length}명</strong>
              <div style={{ fontSize: '14px', color: '#777', marginTop: '10px' }}>
                {staffData.map(s => <p key={s.name}>{s.name}(님) 출근 완료</p>)}
              </div>
            </div>
            <div css={S.summaryBox(true)}>
              <span style={{ color: '#4db6ac', fontWeight: '800' }}>총 결근 인원</span>
              <strong>1명</strong>
              <div style={{ fontSize: '14px', color: '#777', marginTop: '10px' }}>
                <p>김용팔(님) 휴가</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
              <div>
                <h4 css={S.timeTitle}>{user.storeName} 운영 시간</h4>
                <p css={S.timeDisplay}>09:00 - 20:00</p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#bbb' }}>
                2026년 2월 1일 (일)<br />직원 근무 시간
              </div>
            </div>

            <div css={S.graphBox}>
              <div css={S.timeGrid}>
                <span>09시</span><span>12시</span><span>15시</span><span>18시</span><span>21시</span>
              </div>
              
              {staffData.map((staff, idx) => {
                const left = calculatePos(staff.startTime);
                const width = calculatePos(staff.endTime) - left;
                const diff = (parseInt(staff.endTime) - parseInt(staff.startTime)).toString().padStart(2, '0');

                return (
                  <div key={idx} css={S.barWrapper} onClick={() => setSelectedStaff(staff)} style={{ cursor: 'pointer' }}>
                    <div css={S.barRow}>
                      <div css={S.activeBar(staff.color, width, left)} />
                    </div>
                    <div css={S.barLabel}>{staff.name} {diff}시</div>
                  </div>
                );
              })}

              <div css={S.legendArea}>
                {staffData.map((staff, idx) => (
                  <div key={idx} css={S.legendItem(staff.color)}>
                    {staff.name} 총 {(parseInt(staff.endTime) - parseInt(staff.startTime)).toString().padStart(2, '0')}시
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedStaff && (
        <div css={S.modalOverlay} onClick={() => setSelectedStaff(null)}>
          <div css={S.modalContent} onClick={e => e.stopPropagation()}>
            <h3 css={S.modalTitle}>{selectedStaff.name}님의 출근 정보</h3>
            <p css={S.modalInfo}>출근 시각: <b>{selectedStaff.startTime}</b></p>
            <div css={S.modalImageArea}>
              <span>[ 출근 인증 사진 ]</span>
            </div>
            <button css={S.modalButton} onClick={() => setSelectedStaff(null)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerAttendanceView;