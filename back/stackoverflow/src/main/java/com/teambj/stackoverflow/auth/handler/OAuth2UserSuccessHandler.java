package com.teambj.stackoverflow.auth.handler;

import com.teambj.stackoverflow.auth.JwtTokenizer;
import com.teambj.stackoverflow.auth.PrincipalDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {


    private final JwtTokenizer jwtTokenizer;


    public OAuth2UserSuccessHandler(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        String accessToken = delegateAccessToken(authentication);
//        String refreshToken = delegateRefreshToken(authentication);

        String uri = createURI(accessToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);

        response.setHeader("Authorization",  "Bearer " + accessToken);
    }


    private String delegateAccessToken(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", principalDetails.getUserId());
        claims.put("username", principalDetails.getEmail());
        claims.put("roles", principalDetails.getRoles());

        String subject = principalDetails.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

//    private String delegateRefreshToken(Authentication authentication) {
//
//        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
//        String subject = principalDetails.getEmail();
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
//    }

    private URI createURI(String accessToken) {


        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(3000)
                .path("/token")
                .queryParam("Authorization", "Bearer_" + accessToken)
                .build().toUri();
    }

}

