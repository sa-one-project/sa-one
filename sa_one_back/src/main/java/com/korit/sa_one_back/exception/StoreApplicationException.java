package com.korit.sa_one_back.exception;

public class StoreApplicationException extends RuntimeException{
    public StoreApplicationException() {
        super("요청하신 신청 정보를 찾을 수 없습니다.");
    }
}
