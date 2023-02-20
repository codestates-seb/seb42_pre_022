package com.teambj.stackoverflow.auth.mail;

import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MailService {

    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    void sendEmail(SimpleMailMessage simpleMailMessage) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom("보내는 사람 이메일 ");
            messageHelper.setTo(notificationEmail.getRecipient());
            messageHelper.setSubject(notificationEmail.getSubject());
            messageHelper.setText(notificationEmail.getBody(), true);
        };

        try {
            javaMailSender.send(messagePreparator);
            log.info("활성화 메일 보냄");
        } catch (MailException e) {
            log.error(String.valueOf(e));
            throw new RuntimeException("메일을 여기로 보내는 중 에러 발생 :  " + notificationEmail.getRecipient());
        }
    }
}
