package com.teambj.stackoverflow.domain.user.mapper;

import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostToUser(UserDto.Post userPost);
}
