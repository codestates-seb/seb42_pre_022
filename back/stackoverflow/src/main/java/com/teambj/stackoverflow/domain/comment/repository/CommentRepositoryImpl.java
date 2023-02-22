package com.teambj.stackoverflow.domain.comment.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.comment.repository.custom.CommentRepositoryCustom;
import com.teambj.stackoverflow.domain.question.entity.QQuestion;
import com.teambj.stackoverflow.domain.question.entity.Question;

import javax.persistence.EntityManager;
import java.util.List;

import static com.teambj.stackoverflow.domain.comment.entity.QComment.*;
import static com.teambj.stackoverflow.domain.question.entity.QQuestion.*;

public class CommentRepositoryImpl implements CommentRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public CommentRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Comment> findQuestionComments(Long questionId) {
        return queryFactory.selectFrom(comment)
                       .where(questionIdEq(questionId))
                       .fetch();
    }

    @Override
    public List<Comment> findAnswerComments(Long answerId) {
        return queryFactory.selectFrom(comment)
                   .where(answerIdEq(answerId))
                   .fetch();

    }

    private BooleanExpression questionIdEq(Long questionId) {
        return questionId != null ? comment.question.questionId.eq(questionId) : null;
    }

    private BooleanExpression answerIdEq(Long answerId) {
        return answerId != null ? comment.answer.answerId.eq(answerId) : null;
    }
}
