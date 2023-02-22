package com.teambj.stackoverflow.domain.answer.service;

import com.teambj.stackoverflow.domain.answer.dto.AnswerDto;
import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.answer.repository.AnswerRepository;
import com.teambj.stackoverflow.domain.comment.dto.CommentDto;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.comment.repository.CommentRepository;
import com.teambj.stackoverflow.domain.comment.service.CommentService;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.service.QuestionService;
import com.teambj.stackoverflow.exception.BusinessLogicException;
import com.teambj.stackoverflow.exception.ExceptionCode;
import com.teambj.stackoverflow.utils.CustomBeanUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final CommentRepository commentRepository;

    private final CommentService commentService;
    private final CustomBeanUtil<Answer> customBeanUtil;

    /*
     * # 답변 등록
     *
     */
    public Answer createAnswer(Answer answer) {
        return saveAnswer(answer);
    }

    /*
     * # 답변 조회 (개별)
     *
     */
    public Answer findAnswer(Long answerId) {
        return findVerifiedAnswer(answerId);
    }

    /*
     * # 답변 조회 (전체 & 코멘트 포함)
     *
     */
    @Transactional(readOnly = true)
    public List<Answer> findAnswers(Long questionId) {
        List<Answer> answers = answerRepository.findAnswers(questionId);

        for (Answer answer : answers) {
            List<Comment> answerComments = commentService.findAnswerComments(answer.getAnswerId());

            for (Comment comment : answerComments) {
                comment.addAnswer(answer);
            }
        }

        return answers;
    }

    /*
     * # 답변 수정
     *
     */
    public Answer updateAnswer(Answer answer) {
        Answer verifiedAnswer = findVerifiedAnswer(answer.getAnswerId());
        Answer updatedAnswer = customBeanUtil.copyNonNullProperties(answer, verifiedAnswer);

        return saveAnswer(updatedAnswer);
    }

    /*
     * # 답변 삭제
     *
     */
    @Transactional
    public void deleteAnswer(Long answerId) {
        Answer verifiedAnswer = findVerifiedAnswer(answerId);

        commentRepository.deleteAllByAnswerId(answerId);
        answerRepository.delete(verifiedAnswer);
    }

    /*
     * # 답변 검증
     *
     */
    private Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> byId = answerRepository.findById(answerId);

        return byId.orElseThrow(() -> new RuntimeException("등록된 답변이 없습니다."));
    }


    /*
     * # 답변 저장
     *
     */
    private Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }
}
