package com.teambj.stackoverflow.domain.user.dto;

import com.teambj.stackoverflow.domain.user.entity.Reputation;
import lombok.AllArgsConstructor;
import lombok.Getter;

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

    @Getter
    @AllArgsConstructor
    public static class Patch{
        private Long userId;
        private String displayName;
        private String profileImage;

        public void setUserId(long userId) {
            this.userId = userId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long userId;
        private String email;
        private String displayName;
        private Reputation reputation;

        public int getReputation() {
            return reputation.getAmount();
        }
    }
}
