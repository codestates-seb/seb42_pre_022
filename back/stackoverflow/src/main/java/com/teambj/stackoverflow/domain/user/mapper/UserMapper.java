package com.teambj.stackoverflow.domain.user.mapper;

import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostToUser(UserDto.Post userPost);

    UserDto.Response userToUserResponse(User user);

    User userPatchToUser(UserDto.Patch userPatchDto);

    List<UserDto.Response> userListToUserResponseList(Page<User> userList);
}
