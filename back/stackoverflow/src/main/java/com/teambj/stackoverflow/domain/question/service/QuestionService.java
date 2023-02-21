package com.teambj.stackoverflow.domain.question.service;

import com.teambj.stackoverflow.auth.CustomUserDetailsService;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.repository.QuestionRepository;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.exception.BusinessLogicException;
import com.teambj.stackoverflow.exception.ExceptionCode;
import com.teambj.stackoverflow.utils.CustomBeanUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserService userService;
    private final CustomBeanUtil beanUtil;
    //Tag 관련 추가 예정

    public QuestionService(QuestionRepository questionRepository, UserService userService, CustomBeanUtil beanUtil) {
        this.questionRepository = questionRepository;
        this.userService = userService;
        this.beanUtil = beanUtil;
    }

    public Question createQuestion(Question question, Long userId) {
        question.addUser(userService.getUser(userId));
        Question saveQuestion = questionRepository.save(question);

        return saveQuestion;
    }

    public Question updateQuestion(Question question, Long questionId) {
        Question foundQuestion = findQuestion(question.getQuestionId());
        userService.verifyUser(findVerifiedQuestionById(questionId).getUser().getUserId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(foundQuestion::setTitle);
        Optional.ofNullable(question.getBody())
                .ifPresent(foundQuestion::setBody);
//        beanUtil.copyNonNullProperties(question, foundQuestion);

        return foundQuestion;
    }

    public Question findQuestion(Long questionId) {
        return findVerifiedQuestionById(questionId);
    }

    public Page<Question> getAllQuestions(int page) {
        return questionRepository.findAll(PageRequest.of(page, 30));
    }

    public Page<Question> getAllQuestions(int page, String sort) {
        return questionRepository.findAll(PageRequest.of(page, 30, Sort.by(Sort.Order.desc(sort), Sort.Order.desc("createdAt"))));
    }

    public List<Question> getAllQuestion() {
        return questionRepository.findAll();
    }

    public void updateQuestionViewCount(Question question, int viewCount) {
        question.setViewCount(viewCount + 1);
        questionRepository.save(question);
    }

    public void deleteQuestion(Long questionId) {
        Question question = findVerifiedQuestionById(questionId);
        questionRepository.delete(question);
    }

    private Question findVerifiedQuestionById(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question foundQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return foundQuestion;
    }
}
