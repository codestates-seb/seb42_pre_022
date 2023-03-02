package com.teambj.stackoverflow.domain.question.controller;

import com.teambj.stackoverflow.auth.PrincipalDetails;
import com.teambj.stackoverflow.domain.answer.repository.AnswerRepository;
import com.teambj.stackoverflow.domain.answer.service.AnswerService;
import com.teambj.stackoverflow.domain.comment.repository.CommentRepository;
import com.teambj.stackoverflow.domain.question.dto.QuestionPatchDto;
import com.teambj.stackoverflow.domain.question.dto.QuestionPostDto;
import com.teambj.stackoverflow.domain.question.dto.QuestionResponseDto;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import com.teambj.stackoverflow.domain.question.mapper.QuestionMapper;
import com.teambj.stackoverflow.domain.question.repository.QuestionRepository;
import com.teambj.stackoverflow.domain.question.repository.QuestionTagRepository;
import com.teambj.stackoverflow.domain.question.service.QuestionService;
import com.teambj.stackoverflow.domain.tag.entity.Tag;
import com.teambj.stackoverflow.domain.tag.mapper.TagMapper;
import com.teambj.stackoverflow.domain.tag.repository.TagRepository;
import com.teambj.stackoverflow.domain.tag.service.TagService;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.response.ApiResponse;
import com.teambj.stackoverflow.utils.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
@Validated
public class QuestionController {
    private final static String DEFAULT_URI = "/question";
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    private final UserService userService;
    private final TagService tagService;
    private final TagMapper tagMapper;
    private final AnswerRepository answerRepository;
    private final CommentRepository commentRepository;

    @PostMapping("/questions")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto,
                                       @AuthenticationPrincipal PrincipalDetails userDetails) {
        Question question = mapper.questionPostDtoToQuestion(questionPostDto);
        User user = userService.getUser(userDetails.getUserId());
        question.setUser(user);

        Question createdQuestion = questionService.createQuestion(question, questionPostDto.getTagList(), userDetails);
        URI uri = UriUtil.createUri(DEFAULT_URI, question.getQuestionId());

        return ResponseEntity.created(uri).body(ApiResponse.created());
    }

    @PatchMapping("/questions/{questionId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity patchQuestion(@PathVariable("questionId") @Positive Long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto,
                                        @AuthenticationPrincipal PrincipalDetails userDetails) {
        questionPatchDto.setQuestionId(questionId);
        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto), questionPatchDto.getTagList(), userDetails);

        return ResponseEntity.ok().body(ApiResponse.ok("data", questionPatchDto));
    }

    @GetMapping("/questions/{questionId}")
    public ResponseEntity getQuestion(@PathVariable("questionId") @Positive Long questionId) {
    Question question = questionService.findQuestion(questionId);
    List<QuestionTag> questionTags = question.getQuestionTags();
    List<Tag> tags = tagService.findTags(questionTags);

    QuestionResponseDto response = mapper.questionToQuestionResponseDto(question, tags, answerRepository.findAnswers(questionId), commentRepository.findQuestionComments(questionId));

    return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @GetMapping("/questions")
    public ResponseEntity getAllQuestions() {
        List<Question> allQuestions = questionService.getAllQuestion();
        List<QuestionResponseDto> response = mapper.questionToQuestionResponseDtos(allQuestions);
        for (Question q : allQuestions) {
            List<Tag> tags = new ArrayList<>();
            List<QuestionTag> questionTags = q.getQuestionTags();
            for (QuestionTag qt : questionTags) {
                tags.add(qt.getTag());
            }

            for (QuestionResponseDto questionResponse : response) {
                if (questionResponse.getQuestionId() == q.getQuestionId()) {
                    questionResponse.setTagList(tagMapper.tagsToTagResponseDtos(tags));
                    break;
                }
            }
        }

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @DeleteMapping("/questions/{questionId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity deleteQuestion(@PathVariable("questionId") @Positive Long questionId) {
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
