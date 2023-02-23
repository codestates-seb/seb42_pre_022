package com.teambj.stackoverflow.auth.filter;

import com.nimbusds.oauth2.sdk.ErrorResponse;
import com.teambj.stackoverflow.auth.service.CustomUserDetailsService;
import com.teambj.stackoverflow.auth.JwtTokenizer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomUserDetailsService customUserDetailsService) {
        this.jwtTokenizer = jwtTokenizer;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String uriPath = request.getContextPath();
        String authorizationHeader = request.getHeader("Authorization");


        if(uriPath.equals("/users/login") || uriPath.equals("/users/refresh")){
            filterChain.doFilter(request, response);
        } else if( authorizationHeader == null || !authorizationHeader.startsWith("Bearer_")){
            log.info("JWT VerificationFilter : JWT TOKEN 이 존재하지 않습니다.");
        }else{
            try {
                //Access Token
                String jws = authorizationHeader.replace("Bearer_", "");
                String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
                //Verify AccessToken
                Map<String, Object> claims = jwtTokenizer.verifySignature(jws, base64EncodedSecretKey);

                //set Authentication on SecurityContext
                setAuthenticationContext(claims);

                filterChain.doFilter(request, response);
//            } catch (TokenExpiredException e) {
//                log.info("CustomAuthorizationFilter : Access Token이 만료되었습니다.");
//                response.setStatus(SC_UNAUTHORIZED);
//                response.setContentType(APPLICATION_JSON_VALUE);
//                response.setCharacterEncoding("utf-8");
//                ErrorResponse errorResponse = new ErrorResponse(401, "Access Token이 만료되었습니다.");
//                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            } catch (Exception e) {
                log.info("CustomAuthorizationFilter : JWT 토큰이 잘못되었습니다. message : {}", e.getMessage());
//                response.setStatus(SC_BAD_REQUEST);
//                response.setContentType(APPLICATION_JSON_VALUE);
//                response.setCharacterEncoding("utf-8");
//                ErrorResponse errorResponse = new ErrorResponse(400, "잘못된 JWT Token 입니다.");
//                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            }
        }







        filterChain.doFilter(request, response);

    }

    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authentication = request.getHeader("Authorization");

        return authentication == null || !authentication.startsWith("Bearer_");
    }



    private void setAuthenticationContext(Map<String, Object> claims) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername((String) claims.get("username"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
