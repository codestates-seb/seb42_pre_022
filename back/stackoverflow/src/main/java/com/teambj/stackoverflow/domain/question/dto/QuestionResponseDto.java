package com.teambj.stackoverflow.domain.question.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class QuestionResponseDto {
    private Long questionId;
    private Long userId;
    private String title;
    private String body;
    private String displayName;
    private Long answerCount;
    private Long viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private LocalDateTime closedAt;
}
