package com.teambj.stackoverflow.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class UserDto {

    @Getter
    @AllArgsConstructor
    public static class Post{

        private String displayName;

        @NotBlank(message ="Email cannot be empty.")
        @Email
        private String email;

        @NotBlank(message = "Password cannot be empty")
        private String password;

    }
}
