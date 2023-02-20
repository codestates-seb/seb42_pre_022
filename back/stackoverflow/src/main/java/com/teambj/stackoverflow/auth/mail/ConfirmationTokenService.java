package com.teambj.stackoverflow.auth.mail;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final MailSenderService mailSenderService;

    public ConfirmationTokenService(ConfirmationTokenRepository confirmationTokenRepository, MailSenderService mailSenderService) {
        this.confirmationTokenRepository = confirmationTokenRepository;
        this.mailSenderService = mailSenderService;
    }

    //이메일 인증 토큰 생성 및 메일 전송
    public void createEmailConfirmationToken(Long userId, String receiverEmail) {
        ConfirmationToken confirmationToken = ConfirmationToken.createEmailConfirmationToken(userId);
        confirmationTokenRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(receiverEmail);
        mailMessage.setSubject("회원가입 이메일 인증");
        mailMessage.setText("http://localhost:8080/users/confirm-email?token=" + confirmationToken.getId());
        mailSenderService.sendEmail(mailMessage);

    }

    public ConfirmationToken findByIdAndExpirationDateAfterAndExpired(String confirmationTokenId) {
        Optional<ConfirmationToken> confirmationToken = confirmationTokenRepository.findByIdAndExpirationDateAfterAndExpired(confirmationTokenId, LocalDateTime.now(),false);
        return confirmationToken.orElseThrow(() -> new RuntimeException("Token not found"));
    }

    public void useToken(ConfirmationToken token) {
        token.setExpired(true);
        confirmationTokenRepository.save(token);
    }


}
