package com.teambj.stackoverflow.domain.comment.repository.custom;

import com.teambj.stackoverflow.domain.comment.entity.Comment;

import java.util.List;

public interface CommentRepositoryCustom {
    List<Comment> findQuestionComments(Long questionId);
    List<Comment> findAnswerComments(Long answerId);
}
