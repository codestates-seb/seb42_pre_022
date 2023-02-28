package com.teambj.stackoverflow.domain.question.dto;

import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import com.teambj.stackoverflow.domain.user.entity.User;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;
import java.util.List;

@Getter
@AllArgsConstructor
public class QuestionPostDto {
    private String title;

    @NotBlank
    private String body;

    private List<String> tagList;
}
