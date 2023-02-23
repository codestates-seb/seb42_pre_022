package com.teambj.stackoverflow.domain.question.dto;

import com.teambj.stackoverflow.domain.answer.dto.AnswerDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<AnswerDto.Response> answerList;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
