package com.teambj.stackoverflow.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teambj.stackoverflow.auth.service.CustomUserDetailsService;
import com.teambj.stackoverflow.auth.JwtTokenizer;
import com.teambj.stackoverflow.domain.user.dto.LoginDto;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.response.ApiResponse;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtTokenizer jwtTokenizer;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(JwtTokenizer jwtTokenizer, AuthenticationManager authenticationManager) {
        this.jwtTokenizer = jwtTokenizer;
        this.authenticationManager = authenticationManager;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws ServletException, IOException {
        User user = (User) authResult.getPrincipal();

        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

//        ResponseCookie cookie = ResponseCookie
//                .from("Refresh", refreshToken)
//                .maxAge(jwtTokenizer.getRefreshTokenExpirationMinutes())
//                .path("/")
//                .secure(true)
//                .sameSite("None")
//                .httpOnly(true)
//                .build();

        String result = "{\"accessToken\" : \""+accessToken+"\"}";

        response.setStatus(200);
//        response.setHeader("Set-Cookie", cookie.toString());
        response.getWriter().write(result);

//        userDetailsService.updateRefreshToken(user.getEmail(), refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request,response, authResult);
    }

    private String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());
        claims.put("username", user.getEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return "Bearer_" + jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private String delegateRefreshToken(User user) {

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return "Bearer_" + jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }
}
