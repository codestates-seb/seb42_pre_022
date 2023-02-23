package com.teambj.stackoverflow.domain.question.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;
import java.util.List;

@Getter
public class QuestionPostDto {
    @NotNull
    private Long userId;

    private String title;

    @NotBlank
    private String body;

    private List<String> tagNameList;
}
