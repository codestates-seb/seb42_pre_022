package com.teambj.stackoverflow.domain.answer.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.answer.repository.custom.AnswerRepositoryCustom;

import javax.persistence.EntityManager;
import java.util.List;

import static com.teambj.stackoverflow.domain.answer.entity.QAnswer.*;

public class AnswerRepositoryImpl implements AnswerRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public AnswerRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Answer> findAnswers(Long questionId) {
        return queryFactory.select(answer)
                   .from(answer)
                   .where(questionIdEq(questionId))
                   .fetch();
    }

    private BooleanExpression questionIdEq(Long questionId) {
        return questionId != null ? answer.question.questionId.eq(questionId) : null;
    }
}
