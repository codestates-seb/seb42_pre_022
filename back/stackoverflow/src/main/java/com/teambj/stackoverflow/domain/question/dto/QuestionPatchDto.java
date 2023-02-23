package com.teambj.stackoverflow.domain.question.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Builder
public class QuestionPatchDto {
    private Long userId;

    private Long questionId;

    private String title;

    private String body;

    private List<String> tagNameList;

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }
}
