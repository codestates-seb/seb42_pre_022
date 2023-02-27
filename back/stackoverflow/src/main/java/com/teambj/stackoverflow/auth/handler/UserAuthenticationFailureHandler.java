package com.teambj.stackoverflow.auth.handler;

import com.google.gson.Gson;
import com.teambj.stackoverflow.exception.ErrorResponse;
import com.teambj.stackoverflow.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        log.error(" Authentication failed : {}", exception.getMessage());

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setStatus(409);
        String message = "";

        if(exception.getMessage().equals("자격 증명에 실패하였습니다.")){
            message = ExceptionCode.USERS_NOT_VALID.getMessage();

        }else if(exception.getMessage().equals("유효하지 않은 사용자입니다.")){
            message = ExceptionCode.USERS_DOES_NOT_VERIFY_EMAIL.getMessage();
        }else{
            message = ExceptionCode.USERS_NOT_VALID.getMessage();
        }

        String result = "{\"status\" : \""+409+"\",\n\"message\": \"" +message +"\"\n}";
        response.getWriter().write(result);



    }

    private void sendErrorResponse(HttpServletResponse response) {


    }
}
