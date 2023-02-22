package com.teambj.stackoverflow.auth.config;

import com.teambj.stackoverflow.auth.CustomAuthorityUtils;
import com.teambj.stackoverflow.auth.handler.OAuth2UserSuccessHandler;
import com.teambj.stackoverflow.auth.service.CustomUserDetailsService;
import com.teambj.stackoverflow.auth.filter.JwtAuthenticationFilter;
import com.teambj.stackoverflow.auth.JwtTokenizer;
import com.teambj.stackoverflow.auth.filter.JwtVerificationFilter;
import com.teambj.stackoverflow.auth.handler.UserAuthenticationFailureHandler;
import com.teambj.stackoverflow.auth.handler.UserAuthenticationSuccessHandler;
import com.teambj.stackoverflow.auth.service.OAuth2UserDetailsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration{
    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String clientSecret;


    private final JwtTokenizer jwtTokenizer;
    private final CustomUserDetailsService userDetailsService;
    private final CustomAuthorityUtils authorityUtils;
    private final OAuth2UserDetailsService oAuth2UserDetailsService;
    private final OAuth2UserSuccessHandler oAuth2UserSuccessHandler;


    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomUserDetailsService userDetailsService, CustomAuthorityUtils authorityUtils, OAuth2UserDetailsService oAuth2UserDetailsService, OAuth2UserSuccessHandler oAuth2UserSuccessHandler) {
        this.jwtTokenizer = jwtTokenizer;
        this.userDetailsService = userDetailsService;

        this.authorityUtils = authorityUtils;
        this.oAuth2UserDetailsService = oAuth2UserDetailsService;
        this.oAuth2UserSuccessHandler = oAuth2UserSuccessHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .apply(new CustomFilterConfigurer1())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll() //추후 수정
                )
                .oauth2Login()
                .successHandler(new OAuth2UserSuccessHandler(jwtTokenizer))
                .userInfoEndpoint().userService(oAuth2UserDetailsService);//후처리

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*")); //모든 출처에대해 스크립트 기반의 HTTP 통신 허용;
        configuration.setAllowedMethods(List.of("POST","GET","PATCH", "DELETE"));

        UrlBasedCorsConfigurationSource source= new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;

    }

    /*
    SpringSecurityFilter 등록
    JwtAuthenticationFilter, JwtVerificationFilter
     */
    public class CustomFilterConfigurer1 extends AbstractHttpConfigurer<CustomFilterConfigurer1, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenizer, authenticationManager, userDetailsService);
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, userDetailsService);

            builder.addFilter(jwtAuthenticationFilter);
            builder.addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }



}
