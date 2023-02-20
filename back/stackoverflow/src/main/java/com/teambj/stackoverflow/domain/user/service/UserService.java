package com.teambj.stackoverflow.domain.user.service;

import com.teambj.stackoverflow.auth.CustomAuthorityUtils;
import com.teambj.stackoverflow.auth.JwtTokenizer;
import com.teambj.stackoverflow.auth.mail.ConfirmationToken;
import com.teambj.stackoverflow.auth.mail.ConfirmationTokenService;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final ConfirmationTokenService confirmationTokenService;
    private final JwtTokenizer jwtTokenizer;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils, ConfirmationTokenService confirmationTokenService, JwtTokenizer jwtTokenizer) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
        this.confirmationTokenService = confirmationTokenService;
        this.jwtTokenizer = jwtTokenizer;
    }

    public User createUser(User user) {

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

        confirmationTokenService.createEmailConfirmationToken(user.getUserId(), user.getEmail());

        return createdUser;

    }

    public User updateUser(User user) {

        User findUser = verifyUser(user.getUserId());

        Optional.ofNullable(user.getDisplayName())
                .ifPresent(findUser::setDisplayName);

        Optional.ofNullable(user.getProfileImage())
                .ifPresent(findUser::setProfileImage);

        System.out.println(findUser.getUserId());

        return userRepository.save(findUser);

    }



    public void confirmEmail(String token) {
        ConfirmationToken findConfirmationToken = confirmationTokenService.findByIdAndExpirationDateAfterAndExpired(token);
        Optional<User> optionalUser = userRepository.findById(findConfirmationToken.getUserId());

        User user = optionalUser.orElseThrow(() ->
                new RuntimeException("no user"));

        confirmationTokenService.useToken(findConfirmationToken);
        user.setEmailVerified(true);
        userRepository.save(user);

    }

    private void validateDuplicateUser(String email) {

        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isPresent()) {
            throw new RuntimeException("Exist Email");
        }
    }

    private User verifyUser(Long userId) {
        Optional<User> optional = userRepository.findById(userId);
        return optional.orElseThrow(() -> new RuntimeException("No valid user"));
    }
}