package com.teambj.stackoverflow.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class ApiResponse<T> {
    private final ApiResponseHeader header;
    private final Map<String, T> body;

    public static <T> ApiResponse<T> of(HttpStatus status, String key, T value) {
        Map<String, T> body = new HashMap<>() {{ put(key, value); }};

        return new ApiResponse<>(new ApiResponseHeader(status.value(), status.getReasonPhrase()), body);
    }


    public static <T> ApiResponse<T> ok() {
        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.OK.status, ResponseCode.OK.message), null);
    }

    /*
    SingleResponse
     */
    public static <T> ApiResponse<T> ok(String key, T value) {
        Map<String, T> body = new HashMap<>() {{ put(key, value); }};

        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.OK.status, ResponseCode.OK.message), body);
    }

    /*
    MultiResponse
     */
    public static <T> ApiResponse<T> ok(String key1, T value1, String key2, T value2) {
        Map<String, T> body = new HashMap<>() {{ put(key1, value1); put(key2,value2);}};

        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.OK.status, ResponseCode.OK.message), body);
    }

    public static <T> ApiResponse<T> created() {
        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.CREATED.status, ResponseCode.CREATED.message), null);
    }

    public static <T> ApiResponse<T> accepted() {
        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.ACCEPTED.status, ResponseCode.ACCEPTED.message), null);
    }

    public static <T> ApiResponse<T> noContent() {
        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.NO_CONTENT.status, ResponseCode.NO_CONTENT.message), null);
    }

    enum ResponseCode {
        OK(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase()),
        CREATED(HttpStatus.CREATED.value(), HttpStatus.CREATED.getReasonPhrase()),
        ACCEPTED(HttpStatus.ACCEPTED.value(), HttpStatus.ACCEPTED.getReasonPhrase()),
        NO_CONTENT(HttpStatus.NO_CONTENT.value(), HttpStatus.NO_CONTENT.getReasonPhrase()),
        ;

        @Getter
        private final int status;

        @Getter
        private final String message;

        ResponseCode(int status, String message) {
            this.status = status;
            this.message = message;
        }
    }
}
