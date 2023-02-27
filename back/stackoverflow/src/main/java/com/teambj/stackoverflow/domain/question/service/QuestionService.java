package com.teambj.stackoverflow.domain.question.service;

import com.teambj.stackoverflow.auth.PrincipalDetails;
import com.teambj.stackoverflow.auth.service.CustomUserDetailsService;
import com.teambj.stackoverflow.domain.comment.repository.CommentRepository;
import com.teambj.stackoverflow.domain.comment.service.CommentService;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import com.teambj.stackoverflow.domain.question.repository.QuestionRepository;
import com.teambj.stackoverflow.domain.question.repository.QuestionTagRepository;
import com.teambj.stackoverflow.domain.tag.entity.Tag;
import com.teambj.stackoverflow.domain.tag.service.TagService;
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
import java.util.stream.Collectors;

@Transactional
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserService userService;
    private final CustomBeanUtil beanUtil;
    private TagService tagService;
    private final CommentRepository commentRepository;
    private final CommentService commentService;
    private final QuestionTagRepository questionTagRepository;

    public QuestionService(QuestionRepository questionRepository, UserService userService, CustomBeanUtil beanUtil, TagService tagService, CommentRepository commentRepository, CommentService commentService,
                           QuestionTagRepository questionTagRepository) {
        this.questionRepository = questionRepository;
        this.userService = userService;
        this.beanUtil = beanUtil;
        this.tagService = tagService;
        this.commentRepository = commentRepository;
        this.commentService = commentService;
        this.questionTagRepository = questionTagRepository;
    }

    public Question createQuestion(Question question, List<String> tagName,
                                   @AuthenticationPrincipal PrincipalDetails userDetails) {
        question.addUser(userService.getUser(userDetails.getUserId()));

        List<Tag> tags = tagService.createByTagName(tagName);
        tags.forEach(tag -> {
            new QuestionTag(question, tag);
        });

        Question saveQuestion = questionRepository.save(question);

        return saveQuestion;
    }

    public Question updateQuestion(Question question, List<String> tagName, @AuthenticationPrincipal PrincipalDetails userDetails) {
        Question foundQuestion = findQuestion(question.getQuestionId());
        userService.verifyUser(findVerifiedQuestionById(question.getQuestionId()).getUser().getUserId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(foundQuestion::setTitle);
        Optional.ofNullable(question.getBody())
                .ifPresent(foundQuestion::setBody);
        List<QuestionTag> questionTags = foundQuestion.getQuestionTags()
                .stream()
                .collect(Collectors.toList());

/* 요청으로 인해 주석 처리 */
//        if (!tagName.isEmpty()) {
//            List<Tag> tagByString = tagService.createByTagName(tagName);
//            List<QuestionTag> addTags = tagByString.stream()
//                    .map(tag -> new QuestionTag(foundQuestion, tag))
//                    .collect(Collectors.toList());
//            foundQuestion.setQuestionTags(addTags);
//        }
//
//        questionTagRepository.deleteAll(questionTags);

        return foundQuestion;
    }

    @Transactional(readOnly = true)
    public Question findQuestion(Long questionId) {
        Question question = findVerifiedQuestionById(questionId);

        questionRepository.save(question);

        return question;
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
