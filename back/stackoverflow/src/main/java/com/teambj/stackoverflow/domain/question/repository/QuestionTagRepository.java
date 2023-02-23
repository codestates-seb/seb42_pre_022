package com.teambj.stackoverflow.domain.question.repository;

import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionTagRepository extends JpaRepository<QuestionTag, Long> {
}
