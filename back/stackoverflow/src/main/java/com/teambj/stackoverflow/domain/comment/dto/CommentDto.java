package com.teambj.stackoverflow.domain.comment.dto;

import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    public static class Post {
        @Positive
        private Long questionId;

        @Positive
        private Long answerId;

        @NotBlank
        private String body;
    }

    @Getter
    public static class Patch {
        @Positive
        private Long commentId;

        @NotBlank
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private UserDto.Response user;
        private Long commentId;
        private String body;
        private LocalDateTime createdDate;
        private LocalDateTime modifiedDate;
    }
}
