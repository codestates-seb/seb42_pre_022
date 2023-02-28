package com.teambj.stackoverflow.domain.question.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teambj.stackoverflow.domain.question.entity.QQuestion;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import com.teambj.stackoverflow.domain.question.repository.custom.QuestionTagRepositoryCustom;

import javax.persistence.EntityManager;
import java.util.List;

import static com.teambj.stackoverflow.domain.question.entity.QQuestionTag.questionTag;

public class QuestionTagRepositoryImpl implements QuestionTagRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public QuestionTagRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<QuestionTag> tagList(Long tagId) {
        return queryFactory.selectFrom(questionTag)
                .where(questionIdEq(tagId))
                .fetch();
    }

    private BooleanExpression questionIdEq(Long questionId) {
        return questionId != null ? questionTag.question.questionId.eq(questionId) : null;
    }
}
