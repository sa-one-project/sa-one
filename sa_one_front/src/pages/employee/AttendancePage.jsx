import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function AttendancePage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [now, setNow] = useState(new Date());
  const [capturedImg, setCapturedImg] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const [user, setUser] = useState({
    storeEmployeeId: null,
    name: "불러오는 중...",
    storeName: "1호점"
  });

  // [TODO] 출근 확인, 퇴근 관리 로직 짜기??

  // 실시간 시계 및 사용자 정보 로드
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    
    const savedUser = JSON.parse(localStorage.getItem("user")); 
    if (savedUser) {
      setUser({
        storeEmployeeId: savedUser.storeEmployeeId,
        name: savedUser.name,
        storeName: savedUser.storeName || "1호점"
      });
    }

    return () => clearInterval(timer);
  }, []);

  // 카메라 시동
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

  // 사진 촬영
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

  // 등록 버튼 클릭 (실제 데이터 전송)
  const handleRegister = async () => {
    if (!capturedImg) return;

    try {
      const attendanceData = {
        storeEmployeeId: user.storeEmployeeId, // 로그인 정보에서 가져온 ID
        checkInImgUrl: capturedImg,
        checkInTime: now.toISOString(), 
      };

      console.log("전송 데이터:", attendanceData);
      // await axios.post("/api/attendance", attendanceData);
      alert(`${user.name}님, 출근 등록이 완료되었습니다!`);
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", border: "1px solid #ccc", padding: "20px", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
        
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ width: "300px", height: "300px", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", position: "relative" }}>
            {capturedImg ? (
              <img src={capturedImg} alt="captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : isCameraOn ? (
              <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <p>촬영 버튼을 눌러주세요</p>
            )}
          </div>
          <canvas ref={canvasRef} width="300" height="300" style={{ display: "none" }} />
          <div style={{ marginTop: "10px" }}>
            {!isCameraOn && !capturedImg ? (
              <button onClick={handleStartCamera}>카메라 켜기</button>
            ) : isCameraOn ? (
              <button onClick={takePhoto} style={{ background: "#ff4d4f", color: "white" }}>촬영하기</button>
            ) : (
              <button onClick={handleStartCamera}>재촬영</button>
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {/* 아래로는 현재 로그인 된 직원의 정보를 들고와야 함... 모두 임의로 넣어둠. */}
          <p>사업장명: {user.storeName}</p> 
          <p>이름: {user.name}</p>
          <p>날짜: {now.toLocaleDateString()}</p>
          <p>출근: {now.toLocaleTimeString()}</p>
          <hr />
          <p style={{ color: "#999" }}>퇴근: -</p>
          <p style={{ color: "#999" }}>총 근무 시간: -</p>
          
          <div style={{ marginTop: "40px", textAlign: "right" }}>
            <button disabled={!capturedImg} onClick={handleRegister}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;