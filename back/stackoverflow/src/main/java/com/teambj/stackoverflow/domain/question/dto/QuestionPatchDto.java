package com.teambj.stackoverflow.domain.question.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class QuestionPatchDto {
    private Long userId;

    private Long questionId;
    @NotBlank
    private String title;

    private String body;

    private Boolean isAnswered;

//    태그 추가 예정

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }
}
