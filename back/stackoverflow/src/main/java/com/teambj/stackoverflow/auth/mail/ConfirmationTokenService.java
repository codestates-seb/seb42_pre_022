package com.teambj.stackoverflow.auth.mail;

import com.teambj.stackoverflow.exception.BusinessLogicException;
import com.teambj.stackoverflow.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
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
    public void createEmailConfirmationToken(Long userId, String receiverEmail) {
        ConfirmationToken confirmationToken = ConfirmationToken.createEmailConfirmationToken(userId);
        confirmationTokenRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(receiverEmail);
        mailMessage.setSubject("회원가입 이메일 인증");

        mailMessage.setText("아래 링크를 클릭하시면 이메일 인증이 완료돱니다.");
        mailMessage.setText(domain + "/users/confirm-email?token=" + confirmationToken.getId());
        mailSenderService.sendEmail(mailMessage);
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
