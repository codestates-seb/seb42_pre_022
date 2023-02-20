package com.teambj.stackoverflow.domain.question.service;

import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.repository.QuestionRepository;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.exception.BusinessLogicException;
import com.teambj.stackoverflow.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserService userService;
    //Tag 관련 추가 예정

    public QuestionService(QuestionRepository questionRepository, UserService userService) {
        this.questionRepository = questionRepository;
        this.userService = userService;
    }

    public Question createQuestion(Question question, Long userId) {
//        question.addUser(userService.findUser(userId));
//추후 수정
        Question saveQuestion = questionRepository.save(question);
        return saveQuestion;
    }

    public Question findQuestion(Long questionId) {
        return findVerifiedQuestionById(questionId);
    }

    public List<Question> getAllQuestion() {
        return questionRepository.findAll();
    }

    public void updateQuestionViewCount(Question question, Long viewCount) {
        question.setViewCount(viewCount + 1);
        questionRepository.save(question);
    }
    private Question findVerifiedQuestionById(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question foundQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return foundQuestion;
    }


}
