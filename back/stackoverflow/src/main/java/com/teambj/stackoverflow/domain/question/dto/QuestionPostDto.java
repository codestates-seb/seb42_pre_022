package com.teambj.stackoverflow.domain.question.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@AllArgsConstructor
public class QuestionPostDto {
    private String title;

    @NotBlank
    private String body;

    private List<String> tagList;
}
