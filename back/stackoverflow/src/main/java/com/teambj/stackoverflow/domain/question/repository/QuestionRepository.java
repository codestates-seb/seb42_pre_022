package com.teambj.stackoverflow.domain.question.repository;

import com.teambj.stackoverflow.domain.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
