package com.teambj.stackoverflow.domain.user.controller;

import com.google.gson.Gson;
import com.teambj.stackoverflow.auth.CustomUserDetailsService;
import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.Reputation;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.mapper.UserMapper;
import com.teambj.stackoverflow.domain.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/users")
public class UserController {

    private final UserMapper userMapper;
    private final UserService userService;

    public UserController(UserMapper userMapper, UserService userService) {
        this.userMapper = userMapper;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post userPostDto){

        User user = userMapper.userPostToUser(userPostDto);

        user.setReputation(new Reputation());

        User createdUser = userService.createUser(user);

        return new ResponseEntity<>(userMapper.userToUserResponse(createdUser), HttpStatus.OK);
    }

    @GetMapping("confirm-email")
    public ResponseEntity verifyAccount(@Valid @RequestParam String token) {

        userService.confirmEmail(token);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping()
    public ResponseEntity patchUser(@Valid @RequestBody UserDto.Patch userPatchDto, @AuthenticationPrincipal CustomUserDetailsService.CustomUserDetails userDetails) {

        Long userId = userDetails.getUserId();
        User user = userMapper.userPatchToUser(userPatchDto);
        user.setUserId(userId);

        User updatedUser = userService.updateUser(user);

        return new ResponseEntity<>(userMapper.userToUserResponse(updatedUser), HttpStatus.OK);
    }
}
