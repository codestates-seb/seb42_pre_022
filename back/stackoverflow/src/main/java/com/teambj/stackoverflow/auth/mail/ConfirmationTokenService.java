package com.teambj.stackoverflow.auth.mail;

import com.teambj.stackoverflow.exception.BusinessLogicException;
import com.teambj.stackoverflow.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final MailSenderService mailSenderService;

    @Value("${domain}")
    private String domain;

    public ConfirmationTokenService(ConfirmationTokenRepository confirmationTokenRepository, MailSenderService mailSenderService) {
        this.confirmationTokenRepository = confirmationTokenRepository;
        this.mailSenderService = mailSenderService;
    }

    /*
    이메일 인증 토큰 생성 및 메일 전송
     */
    public void createEmailConfirmationToken(Long userId, String receiverEmail) throws MessagingException {

        ConfirmationToken confirmationToken = ConfirmationToken.createEmailConfirmationToken(userId);
        confirmationTokenRepository.save(confirmationToken);

        String link = domain + "/users/confirm-email?token=" + confirmationToken.getId();
        mailSenderService.sendEmail(receiverEmail, link);
    }

    public ConfirmationToken findByIdAndExpired(String confirmationTokenId) {
        Optional<ConfirmationToken> confirmationToken = confirmationTokenRepository.findByIdAndExpired(confirmationTokenId, false);
        return confirmationToken.orElseThrow(() -> new BusinessLogicException(ExceptionCode.EMAIL_TOKEN_EXPIRED));
    }

    public void useToken(ConfirmationToken token) {
        token.setExpired(true);
        confirmationTokenRepository.save(token);
    }


}
