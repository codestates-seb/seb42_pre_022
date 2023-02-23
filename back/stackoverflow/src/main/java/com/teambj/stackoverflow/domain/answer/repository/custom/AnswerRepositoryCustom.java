package com.teambj.stackoverflow.domain.answer.repository.custom;

import com.teambj.stackoverflow.domain.answer.entity.Answer;

import java.util.List;

public interface AnswerRepositoryCustom {
    List<Answer> findAnswers(Long questionId);
}
