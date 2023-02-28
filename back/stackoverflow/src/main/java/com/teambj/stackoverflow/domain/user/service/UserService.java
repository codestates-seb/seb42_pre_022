package com.teambj.stackoverflow.domain.user.service;

import com.teambj.stackoverflow.auth.CustomAuthorityUtils;
import com.teambj.stackoverflow.auth.mail.ConfirmationToken;
import com.teambj.stackoverflow.auth.mail.ConfirmationTokenService;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.repository.UserRepository;
import com.teambj.stackoverflow.exception.BusinessLogicException;
import com.teambj.stackoverflow.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final ConfirmationTokenService confirmationTokenService;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils, ConfirmationTokenService confirmationTokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
        this.confirmationTokenService = confirmationTokenService;
    }

    public User createUser(User user) {

        validateDuplicateUser(user.getEmail());

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        List<String> roles = new ArrayList<>(customAuthorityUtils.createRoles(user.getEmail()));
        user.setRoles(roles);

        User createdUser = userRepository.saveAndFlush(user);

        Long userId = user.getUserId();
        Optional<String> optional = Optional.ofNullable(user.getDisplayName());
        if (optional.isEmpty()) {
            user.setDisplayName("user"+userId);
        }

        String profileURI = "https://source.boringavatars.com/beam/120/" + userId + "?colors=66FFFF,8CBFE6,B380CC,D940B3,FF0099";
        user.setProfileImage(profileURI);

        userRepository.save(user);

        confirmationTokenService.createEmailConfirmationToken(user.getUserId(), user.getEmail());

        return createdUser;
    }

    public User updateUser(User user) {

        User findUser = verifyUser(user.getUserId());

        Optional.ofNullable(user.getDisplayName())
                .ifPresent(findUser::setDisplayName);

        return userRepository.save(findUser);
    }


    @Transactional(readOnly = true)
    public Page<User> getUserList(int page) {
        return userRepository.findAll(PageRequest.of(page,36,Sort.by(Sort.Direction.DESC, "reputation")));
    }

    public User getUser(Long userId) {

        Optional<User> optional = userRepository.findById(userId);
        return optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERS_NOT_VALID));
    }

    private void validateDuplicateUser(String email) {

        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USERS_EXISTS_EMAIL);
        }
    }

    public void confirmEmail(String token) {
        ConfirmationToken findConfirmationToken = confirmationTokenService.findByIdAndExpired(token);
        Optional<User> optionalUser = userRepository.findById(findConfirmationToken.getUserId());

        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERS_NOT_VALID));

        confirmationTokenService.useToken(findConfirmationToken);
        user.setEmailVerified(true);
        userRepository.save(user);
    }

    public User verifyUser(Long userId) {
        Optional<User> optional = userRepository.findById(userId);
        return optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERS_NOT_VALID));
    }
}
