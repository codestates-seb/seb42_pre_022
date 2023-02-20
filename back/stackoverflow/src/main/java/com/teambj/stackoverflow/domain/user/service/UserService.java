package com.teambj.stackoverflow.domain.user.service;

import com.teambj.stackoverflow.auth.CustomAuthorityUtils;
import com.teambj.stackoverflow.auth.mail.MailService;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final VerificationTokenRepository verificationTokenRepository;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils, MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
        this.mailService = mailService;
    }

    public void createUser(User user) {

        validateDuplicateUser(user.getEmail());

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        List<String> roles = customAuthorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        User createdUser = userRepository.save(user);

        Optional<String> optional = Optional.ofNullable(createdUser.getDisplayName());
        if (optional.isEmpty()) {
            createdUser.setDisplayName("user"+createdUser.getUserId());
            userRepository.save(createdUser);
        }

        String token = generateVerificationToken(createdUser);
        String link = Constants.ACTIVATION_EMAIL + "/" + token;
        String message = mailContentBuilder.build(link);

        mailService.sendEmail(new NotificationEmail("게정 활성화를 실행해주세요.", user.getEmail(), message));


    }

    private String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerifcationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationTokenRepository.save(verificationToken);

        return token;
    }

    public void verifyAccount(String token) {
        Optional<VerificationToken> verificationTokenOptional = verificationTokenRepository.findByToken(token);
        verificationTokenOptional.orElseThrow(() -> new RuntimeException("잘못된 토큰"));

        fetchUserAndEnable(verificationTokenOptional.get());
    }

    private void validateDuplicateUser(String email) {

        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isPresent()) {
            throw new RuntimeException("Exist Email");
            //로그인으로 이동
        }
    }

    private void fetchUserAndEnable(VerificationToken verificationToken) {
        String email = verificationToken.getUser().getEmail();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("유저를 찾을 수 없음"));
        user.setEnabled(true);
        userRepository.save(user);
    }
}
