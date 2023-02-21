package com.teambj.stackoverflow.domain.question.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Getter
public class QuestionPostDto {
//    @NotNull
    private Long userId;

    @NotBlank
    private String title;

    @NotBlank
    private String body;

//    태그 추가 예정
}
