package com.teambj.stackoverflow.domain.question.repository.custom;

import com.teambj.stackoverflow.domain.question.entity.Question;

import java.util.List;

public interface QuestionRepositoryCustom {
    List<Question> findQuestions(Long questionId);
}
