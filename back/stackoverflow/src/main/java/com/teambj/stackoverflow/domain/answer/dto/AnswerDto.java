package com.teambj.stackoverflow.domain.answer.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.teambj.stackoverflow.domain.comment.dto.CommentDto;
import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


public class AnswerDto {
    @Getter
    public static class Post {
        @Positive
        private Long questionId;

        @NotBlank
        private String body;
    }

    @Getter
    public static class Patch {
        @Positive
        private Long answerId;

        @NotBlank
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private UserDto.Response user;
        private Long answerId;
        private String body;
        private LocalDateTime createdDate;
        private LocalDateTime modifiedDate;
        private List<CommentDto.Response> comments;
    }
}
