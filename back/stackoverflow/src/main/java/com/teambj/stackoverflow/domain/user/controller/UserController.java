package com.teambj.stackoverflow.domain.user.controller;

import com.teambj.stackoverflow.auth.service.CustomUserDetailsService;
import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.Reputation;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.mapper.UserMapper;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.response.ApiResponse;
import com.teambj.stackoverflow.utils.UriUtil;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@Validated
@RequestMapping("/users")
public class UserController {

    private final UserMapper userMapper;
    private final UserService userService;

    public static final String DEFAULT_URI = "/users";


    public UserController(UserMapper userMapper, UserService userService) {
        this.userMapper = userMapper;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> postUser(@Valid @RequestBody UserDto.Post userPostDto){

        User user = userMapper.userPostToUser(userPostDto);
        user.setReputation(new Reputation());

        User createdUser = userService.createUser(user);

        URI uri = UriUtil.createUri(DEFAULT_URI, createdUser.getUserId());

        return ResponseEntity.created(uri).body(ApiResponse.created());
    }

    @GetMapping("/confirm-email")
    public ResponseEntity<?> verifyAccount(@Valid @RequestParam String token) {
        userService.confirmEmail(token);

        return ResponseEntity.ok().build();
    }

    @PatchMapping
    public ResponseEntity<?> patchUser(@Valid @RequestBody UserDto.Patch userPatchDto, @AuthenticationPrincipal CustomUserDetailsService.UserPrincipal userDetails) {
        User user = userMapper.userPatchToUser(userPatchDto);
        user.setUserId(userDetails.getUserId());

        User updatedUser = userService.updateUser(user);

        return ResponseEntity.ok().body(ApiResponse.ok("data", userMapper.userToUserResponse(updatedUser)));
    }

    @GetMapping
    public ResponseEntity<?> getUsers(@Positive @RequestParam int page){
        Page<User> userList = userService.getUserList(page-1);
        List<UserDto.Response> userResponseList = userMapper.userListToUserResponseList(userList);

        return ResponseEntity.ok().body(ApiResponse.ok("data", userResponseList, "pageNumber", page));
    }

    @GetMapping("/{user-id}")
    public ResponseEntity<?> getUser(@Positive @PathVariable("user-id") Long userId){
        User user = userService.getUser(userId);

        return ResponseEntity.ok().body(ApiResponse.ok("data", userMapper.userToUserResponse(user)));
    }

    /*
    GET - 계정 소유자 정보
     */
    @GetMapping("/principal")
    public ResponseEntity<?> getPrincipal(@AuthenticationPrincipal CustomUserDetailsService.UserPrincipal userDetails) {

        User user = userService.getUser(userDetails.getUserId());

        return ResponseEntity.ok().body(ApiResponse.ok("data", userMapper.userToUserResponse(user)));
    }
}
