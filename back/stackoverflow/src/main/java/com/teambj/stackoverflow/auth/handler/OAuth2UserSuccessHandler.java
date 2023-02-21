package com.teambj.stackoverflow.auth.handler;

import com.teambj.stackoverflow.auth.CustomAuthorityUtils;
import com.teambj.stackoverflow.auth.JwtTokenizer;
import com.teambj.stackoverflow.domain.user.entity.Reputation;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final UserService userService;

    public OAuth2UserSuccessHandler(JwtTokenizer jwtTokenizer, CustomAuthorityUtils customAuthorityUtils, UserService userService) {
        this.jwtTokenizer = jwtTokenizer;
        this.customAuthorityUtils = customAuthorityUtils;
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = (String) oAuth2User.getAttributes().get("email");
        List<String> authorities = customAuthorityUtils.createRoles(email);

        User createdUser = createUser(email);
        redirect(request, response, createdUser);
    }

    private User createUser(String email) {

        User user = new User(email);
        user.setReputation(new Reputation());

        return userService.createUser(user);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response,User user) throws IOException {
        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }



    private String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());
        claims.put("username", user.getEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private String delegateRefreshToken(User user) {

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
