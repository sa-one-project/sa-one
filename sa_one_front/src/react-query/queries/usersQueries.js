/**
 * 현재 로그인한 사용자의 정보를 가져오는 커스텀 훅
 * TODO: 실제 백엔드 /api/users/me 엔드포인트 연결 예정
 */
export const useMeQuery = () => {
    /**
     * [임시 Mock Data]
     * API 연동 전까지는 인증되지 않은 상태(401)를 기본값으로 설정하여 
     * AuthRoute의 로그인 페이지 리다이렉션 로직이 정상 작동하는지 테스트함
     */
    return {
        // 로딩 상태: false (즉시 응답 가정)
        isLoading: false,
        
        // 응답 데이터: 401 Unauthorized 상태로 초기화
        data: { 
            status: 401,
            message: "인증되지 않은 사용자입니다."
        } 
    };
};