package com.teambj.stackoverflow.domain.answer.repository;

import com.teambj.stackoverflow.domain.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
