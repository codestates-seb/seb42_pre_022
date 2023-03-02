package com.teambj.stackoverflow.domain.question.repository.custom;

import com.teambj.stackoverflow.domain.question.entity.QuestionTag;

import java.util.List;

public interface QuestionTagRepositoryCustom {
    List<QuestionTag> tagList(Long questionId);
}
