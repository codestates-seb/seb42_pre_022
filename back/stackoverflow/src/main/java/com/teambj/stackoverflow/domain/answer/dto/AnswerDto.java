package com.teambj.stackoverflow.domain.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;


public class AnswerDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @Positive
        private Long questionId;

        @NotBlank
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long answerId;
        private String body;
        private LocalDateTime createdDate;
        private LocalDateTime modifiedDate;
    }
}
