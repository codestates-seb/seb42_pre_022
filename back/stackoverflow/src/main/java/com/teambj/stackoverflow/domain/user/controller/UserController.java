package com.teambj.stackoverflow.domain.user.controller;

import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.Reputation;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.mapper.UserMapper;
import com.teambj.stackoverflow.domain.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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
}
