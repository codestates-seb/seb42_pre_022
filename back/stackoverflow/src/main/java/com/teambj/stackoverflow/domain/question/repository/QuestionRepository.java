package com.teambj.stackoverflow.domain.question.repository;

import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.repository.custom.QuestionRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionRepository extends JpaRepository<Question, Long>, QuestionRepositoryCustom {
    @Modifying
    @Query("update Question p set p.viewCount = :viewCount where p.questionId = :questionId")
    int updateViewCount(@Param("viewCount") int viewCount, @Param("questionId") Long questionId);

}
