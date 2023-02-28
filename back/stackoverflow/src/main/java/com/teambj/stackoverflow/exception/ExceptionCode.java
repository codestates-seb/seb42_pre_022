package com.teambj.stackoverflow.exception;

import lombok.Getter;

public enum ExceptionCode {
    /*
    400 BAD REQUEST - 잘못된 요청
     */
    BAD_REQUEST(400, "잘못된 요청입니다."),

    /*
    401 UNAUTHORIZED : 인증되지 않은 사용자
     */
    UNAUTHORIZED(401, "권한이 없습니다."),

    /*
    404 NOT_FOUND : Resource 를 찾을 수 없음.
     */
    QUESTION_NOT_FOUND(404, "Question not found"),

    /*
    409 CONFLICT : Resource 의 현재 상태와 충돌.
     */
    USERS_EXISTS_EMAIL(409,"이미 존재하는 이메일입니다."),
    USERS_NOT_VALID_USERNAME_PASSWORD(409, "등록되지 않은 이메일/비밀번호 입니다."),
    EMAIL_TOKEN_EXPIRED(409, "만료된 이메일 인증 토큰입니다."),
    USERS_DOES_NOT_VERIFY_EMAIL(409, "이메일 인증이 되지 않았습니다." ),
    USERS_NOT_VALID(409, "등록되지 않은 사용자입니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
