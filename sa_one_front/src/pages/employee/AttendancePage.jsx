/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import OwnerAttendanceView from "../owner/OwnerAttendanceView";
import * as S from "./AttendanceStyle";

function AttendancePage() {
  const { roleId } = useAuthStore();
  const isOwner = Number(roleId) === 1;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [now, setNow] = useState(new Date());
  const [capturedImg, setCapturedImg] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [user, setUser] = useState({ storeEmployeeId: null, name: "불러오는 중...", storeName: "1호점" });

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTimeDisplay, setCheckInTimeDisplay] = useState("-");

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isCheckedIn) setNow(new Date());
    }, 1000);

    const savedUser = JSON.parse(localStorage.getItem("user")); 
    if (savedUser) {
      setUser({
        storeEmployeeId: savedUser.storeEmployeeId,
        name: savedUser.name,
        storeName: savedUser.storeName || "1호점"
      });
    }
    return () => clearInterval(timer);
  }, [isCheckedIn]);

  const handleStartCamera = () => {
    setCapturedImg(null);
    setIsCameraOn(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        }, 100);
      })
      .catch(err => {
        console.error("카메라 에러:", err);
      });
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 300, 300);
      const data = canvasRef.current.toDataURL("image/png");
      setCapturedImg(data);
      
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCameraOn(false);
    }
  };

  const handleRegister = async () => {
    if (!capturedImg) return;
    try {
      const fixedTime = now.toLocaleTimeString();
      setCheckInTimeDisplay(fixedTime);
      setIsCheckedIn(true);

      const attendanceData = {
        storeEmployeeId: user.storeEmployeeId,
        checkInImgUrl: capturedImg,
        checkInTime: now.toISOString(), 
      };
      console.log("전송 데이터:", attendanceData);
      alert(`${user.name}님, ${fixedTime}에 출근 등록이 완료되었습니다!`);
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  if (isOwner) return <OwnerAttendanceView user={user} />;

  return (
    <div css={S.employee.container}>
      <div css={S.employee.card}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div css={S.employee.photoArea}>
            {capturedImg ? (
              <img src={capturedImg} alt="captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : isCameraOn ? (
              <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <p>촬영 버튼을 눌러주세요</p>
            )}
          </div>
          <canvas ref={canvasRef} width="300" height="300" style={{ display: "none" }} />
          <div style={{ marginTop: "15px" }}>
            {/* 출근 완료 후에는 버튼 숨김 */}
            {!isCheckedIn && (
              !isCameraOn && !capturedImg ? (
                <button onClick={handleStartCamera}>카메라 켜기</button>
              ) : isCameraOn ? (
                <button onClick={takePhoto} style={{ background: "#ff4d4f", color: "white" }}>촬영하기</button>
              ) : (
                <button onClick={handleStartCamera}>재촬영</button>
              )
            )}
          </div>
        </div>

        <div css={S.employee.infoArea}>
          <p><span>사업장명</span> <span>{user.storeName}</span></p> 
          <p><span>이름</span> <span>{user.name}</span></p>
          <p><span>날짜</span> <span>{now.toLocaleDateString()}</span></p>
          <p>
            <span>출근</span> 
            <span style={{ color: isCheckedIn ? "#599afd" : "inherit" }}>
              {isCheckedIn ? checkInTimeDisplay : now.toLocaleTimeString()}
            </span>
          </p>
          <hr />
          <p className="sub-text"><span>퇴근</span> <span>-</span></p>
          <p className="sub-text"><span>총 근무 시간</span> <span>-</span></p>
          <div style={{ textAlign: "right" }}>
            <button 
              disabled={!capturedImg || isCheckedIn} 
              onClick={handleRegister}
              css={S.employee.registerBtn(!!capturedImg && !isCheckedIn)}
            >
              {isCheckedIn ? "출근 완료" : "확인"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;