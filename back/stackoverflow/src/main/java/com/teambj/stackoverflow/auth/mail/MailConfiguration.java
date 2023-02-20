package com.teambj.stackoverflow.auth.mail;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfiguration {

    @Bean
    public JavaMailSender javaMailService() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        javaMailSender.setHost("${mail.smtp.host}"); // 메인 도메인 서버 주소 => 정확히는 smtp 서버 주소
        javaMailSender.setUsername("{mail.smtp.username}");
        javaMailSender.setPassword("{mail.smtp.password}");

        javaMailSender.setPort(465); // 메일 인증서버 포트

        javaMailSender.setJavaMailProperties(getMailProperties()); // 메일 인증서버 정보 가져오기

        return javaMailSender;
    }


    private Properties getMailProperties() {
        Properties properties = new Properties();
        properties.put("mail.transport.protocol", "smtp"); // 프로토콜 설정
        properties.put("mail.smtp.auth", true); // smtp 인증
        properties.put("mail.smtp.starttls.enable", true); // smtp strattles 사용
        properties.put("mail.smtp.debug", true); // 디버그 사용
        properties.put("mail.smtp.ssl.trust","smtp.gmail.com"); // ssl 인증 서버 smtp@gmail.com
        properties.put("mail.smtp.ssl.enable",true); // ssl 사용
        return properties;
    }
}
