package com.teambj.stackoverflow.domain.comment.repository;

import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.comment.repository.custom.CommentRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface CommentRepository extends JpaRepository<Comment, Long>, CommentRepositoryCustom {
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("delete from Comment c where c.answer.answerId = :answerId")
    void deleteAllByAnswerId(Long answerId);
}
