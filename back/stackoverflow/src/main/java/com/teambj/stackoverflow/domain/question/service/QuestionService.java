package com.teambj.stackoverflow.domain.question.service;

import com.teambj.stackoverflow.auth.PrincipalDetails;
import com.teambj.stackoverflow.domain.answer.repository.AnswerRepository;
import com.teambj.stackoverflow.domain.answer.service.AnswerService;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.comment.repository.CommentRepository;
import com.teambj.stackoverflow.domain.comment.service.CommentService;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import com.teambj.stackoverflow.domain.question.repository.QuestionRepository;
import com.teambj.stackoverflow.domain.question.repository.QuestionTagRepository;
import com.teambj.stackoverflow.domain.tag.entity.Tag;
import com.teambj.stackoverflow.domain.tag.repository.TagRepository;
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
    private final AnswerRepository answerRepository;
    private final AnswerService answerService;
    private final TagRepository tagRepository;

    public QuestionService(QuestionRepository questionRepository, UserService userService, CustomBeanUtil beanUtil, TagService tagService, CommentRepository commentRepository, CommentService commentService,
                           QuestionTagRepository questionTagRepository,
                           AnswerRepository answerRepository, AnswerService answerService,
                           TagRepository tagRepository) {
        this.questionRepository = questionRepository;
        this.userService = userService;
        this.beanUtil = beanUtil;
        this.tagService = tagService;
        this.commentRepository = commentRepository;
        this.commentService = commentService;
        this.questionTagRepository = questionTagRepository;
        this.answerRepository = answerRepository;
        this.answerService = answerService;
        this.tagRepository = tagRepository;
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

    public Question updateQuestion(Question question, List<String> tagList, @AuthenticationPrincipal PrincipalDetails userDetails) {
        Question foundQuestion = findQuestion(question.getQuestionId());
        userService.verifyUser(findVerifiedQuestionById(question.getQuestionId()).getUser().getUserId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(foundQuestion::setTitle);
        Optional.ofNullable(question.getBody())
                .ifPresent(foundQuestion::setBody);
        if (Optional.ofNullable(tagList).isPresent()) {
            for (int i = 0; i < foundQuestion.getQuestionTags().size(); i++) {
                QuestionTag questionTag = foundQuestion.getQuestionTags().get(i);
                foundQuestion.getQuestionTags().remove(questionTag);
                questionTag.getTag().getQuestionTags().remove(questionTag);
                questionTagRepository.delete(questionTag);
                i--;
            }

            for (String tag : tagList) {
                if (tagRepository.findByTagName(tag).isEmpty()) {
                    Tag newTag = new Tag();
                    newTag.setTagName(tag);
                    tagRepository.save(newTag);
                }
                Tag foundTag = tagRepository.findByTagName(tag).get();
                QuestionTag questionTag = new QuestionTag();
                questionTag.setTag(foundTag);
                questionTag.setQuestion(question);
                foundQuestion.getQuestionTags().add(questionTag);
                foundTag.getQuestionTags().add(questionTag);
                questionTagRepository.save(questionTag);
            }
        }

        return foundQuestion;
    }

    @Transactional(readOnly = true)
    public Question findQuestion(Long questionId) {
        Question foundQuestion = findVerifiedQuestionById(questionId);
        List<Question> questions = questionRepository.findQuestions(questionId);
        questionRepository.updateViewCount(foundQuestion.getViewCount() + 1, foundQuestion.getQuestionId());

        for (Question question : questions) {
            List<Comment> questionComments = commentService.findQuestionComments(question.getQuestionId());
            for (Comment comment : questionComments) {
                comment.addQuestion(question);
            }
        }

        foundQuestion.setAnswerCount(answerService.findAnswers(questionId).size());

        questionRepository.save(foundQuestion);

        return foundQuestion;
    }

    public List<QuestionTag> findQuestionTagList(Long questionId) {
        return questionTagRepository.tagList(questionId);
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
