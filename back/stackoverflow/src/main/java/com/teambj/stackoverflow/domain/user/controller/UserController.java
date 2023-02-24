package com.teambj.stackoverflow.domain.user.controller;

import com.teambj.stackoverflow.auth.PrincipalDetails;
import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.Reputation;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.mapper.UserMapper;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.response.ApiResponse;
import com.teambj.stackoverflow.utils.UriUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@Slf4j
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
    public ResponseEntity<?> postUser(@Valid @RequestBody UserDto.Post userPostDto) {

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

    /*
    PATCH - 사용자 정보 수정
     */
    @PatchMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> patchUser(@Valid @RequestBody UserDto.Patch userPatchDto, @AuthenticationPrincipal PrincipalDetails userDetails) {
        User user = userMapper.userPatchToUser(userPatchDto);
        user.setUserId(userDetails.getUserId());

        User updatedUser = userService.updateUser(user);

        return ResponseEntity.ok().body(ApiResponse.ok("data", userMapper.userToUserResponse(updatedUser)));
    }

    /*
    GET - 사용자 목록 조회
     */
    @GetMapping
    public ResponseEntity<?> getUsers(@Positive @RequestParam int page) {
        Page<User> userList = userService.getUserList(page - 1);
        List<UserDto.Response> userResponseList = userMapper.userListToUserResponseList(userList);

        return ResponseEntity.ok().body(ApiResponse.ok("data", userResponseList, "pageNumber", page));
    }

    /*
    GET - 타 사용자 정보 조회
     */
    @GetMapping("/{user-id}")
    public ResponseEntity<?> getUser(@Positive @PathVariable("user-id") Long userId) {
        User user = userService.getUser(userId);
        log.info("getUser");

        return ResponseEntity.ok().body(ApiResponse.ok("data", userMapper.userToUserResponse(user)));
    }

    /*
    GET - 계정 소유자 정보 조회
     */
    @GetMapping("/principal")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getPrincipal(@AuthenticationPrincipal PrincipalDetails userDetails) {

        User user = userService.getUser(userDetails.getUserId());

        return ResponseEntity.ok().body(ApiResponse.ok("data", userMapper.userToUserResponse(user)));
    }

//    @GetMapping("/refresh")
//    public ResponseEntity<?> getRefreshToken(HttpServletRequest request, HttpServletResponse response) {
//        String authorizationHeader = request.getHeader("Authorization");
//
//        if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer_")){
//            throw new RuntimeException("JWT token 이 존재하지 않습니다.");
//        }
//
//        String refreshToken = authorizationHeader.replace("Bearer_", "");
//        Map<String, String> tokens = userService.refresh(refreshToken);
//        response.setHeader("Authorization", "Bearer_" + tokens.get("access_token"));
//        if(tokens.get("refresh_token") != null){
//            response.setHeader("refresh_token", tokens.get("refresh_token"));
//        }
//        return ResponseEntity.ok(tokens);
//
//    }
}
