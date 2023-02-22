package com.teambj.stackoverflow.auth.handler;

import com.teambj.stackoverflow.auth.CustomAuthorityUtils;
import com.teambj.stackoverflow.auth.JwtTokenizer;
import com.teambj.stackoverflow.auth.PrincipalDetails;
import com.teambj.stackoverflow.auth.service.OAuth2UserDetailsService;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final OAuth2UserDetailsService oAuth2UserDetailsService;
    private final CustomAuthorityUtils authorityUtils;


    public OAuth2UserSuccessHandler(JwtTokenizer jwtTokenizer, OAuth2UserDetailsService oAuth2UserDetailsService, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.oAuth2UserDetailsService = oAuth2UserDetailsService;
        this.authorityUtils = authorityUtils;

    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        List<String> authorities = authorityUtils.createRoles(email);

//        User user = saveUser(email);

        String accessToken = delegateAccessToken(authentication);
        String refreshToken = delegateRefreshToken(authentication);

        response.setHeader("Authorization",  "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
    }

//    private User saveUser(String email) {
//        User user = new User(email);
//        user.setReputation(new Reputation());
//    }


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

    private String delegateRefreshToken(Authentication authentication) {

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String subject = principalDetails.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

}
