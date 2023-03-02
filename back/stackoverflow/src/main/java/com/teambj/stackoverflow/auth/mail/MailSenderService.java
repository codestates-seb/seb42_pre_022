package com.teambj.stackoverflow.auth.mail;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailSenderService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public MailSenderService(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    void sendEmail(String receiverEmail, String link) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setSubject("Complete Registration With Stack Overflow by SEB42PRE22");
        helper.setTo(receiverEmail);


        Context context = new Context();
        context.setVariable("link", link);

        String html = templateEngine.process("email", context);
        helper.setText(html, true);

        javaMailSender.send(message);

    }
}
