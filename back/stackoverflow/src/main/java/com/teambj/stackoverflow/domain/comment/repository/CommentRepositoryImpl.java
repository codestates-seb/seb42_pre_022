package com.teambj.stackoverflow.domain.comment.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.comment.repository.custom.CommentRepositoryCustom;

import javax.persistence.EntityManager;
import java.util.List;

import static com.teambj.stackoverflow.domain.comment.entity.QComment.*;

public class CommentRepositoryImpl implements CommentRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public CommentRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Comment> findQuestionComments(Long questionId) {
        return null;
    }

    @Override
    public List<Comment> findAnswerComments(Long answerId) {
        return queryFactory.selectFrom(comment)
                   .where(answerIdEq(answerId))
                   .fetchJoin()
                   .fetch();

    }

    private BooleanExpression answerIdEq(Long answerId) {
        return answerId != null ? comment.answer.answerId.eq(answerId) : null;
    }
}
