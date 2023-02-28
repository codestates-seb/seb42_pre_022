package com.teambj.stackoverflow.domain.question.repository;

import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import com.teambj.stackoverflow.domain.question.repository.custom.QuestionTagRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionTagRepository extends JpaRepository<QuestionTag, Long>, QuestionTagRepositoryCustom {
}
