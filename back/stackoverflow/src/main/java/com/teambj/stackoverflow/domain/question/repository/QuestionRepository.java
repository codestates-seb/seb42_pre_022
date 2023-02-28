package com.teambj.stackoverflow.domain.question.repository;

import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.repository.custom.QuestionRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long>, QuestionRepositoryCustom {

}
