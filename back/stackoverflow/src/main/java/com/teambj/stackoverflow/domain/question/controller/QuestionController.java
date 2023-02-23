package com.teambj.stackoverflow.domain.question.controller;

import com.teambj.stackoverflow.auth.service.CustomUserDetailsService;
import com.teambj.stackoverflow.domain.question.dto.QuestionPatchDto;
import com.teambj.stackoverflow.domain.question.dto.QuestionPostDto;
import com.teambj.stackoverflow.domain.question.dto.QuestionResponseDto;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.mapper.QuestionMapper;
import com.teambj.stackoverflow.domain.question.service.QuestionService;
import com.teambj.stackoverflow.response.ApiResponse;
import com.teambj.stackoverflow.response.ApiResponseHeader;
import com.teambj.stackoverflow.utils.UriUtil;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping
@Validated
public class QuestionController {
    private final static String DEFAULT_URI = "/question";
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping("/questions")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto) {
        Question question = questionService.createQuestion(mapper.questionPostDtoToQuestion(questionPostDto), questionPostDto.getUserId());
        URI uri = UriUtil.createUri(DEFAULT_URI, question.getQuestionId());

        return ResponseEntity.created(uri).body(ApiResponse.created());
    }

    @PatchMapping("/questions/{questionId}")
    public ResponseEntity patchQuestion(@PathVariable("questionId") @Positive Long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {
        questionPatchDto.setQuestionId(questionId);
        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto), questionPatchDto.getUserId());

        return ResponseEntity.ok().body(ApiResponse.ok("data", questionPatchDto));
    }

    @GetMapping("/questions/{questionId}")
    public ResponseEntity getQuestion(@PathVariable("questionId") @Positive Long questionId) {
    Question question = questionService.findQuestion(questionId);
    questionService.updateQuestionViewCount(question, question.getViewCount());
    QuestionResponseDto response = mapper.questionToQuestionResponseDto(question);

    return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @GetMapping("/questions")
    public ResponseEntity getAllQuestions() {
        List<Question> allQuestions = questionService.getAllQuestion();
        List<QuestionResponseDto> response = mapper.questionToQuestionResponseDtos(allQuestions);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity deleteQuestion(@PathVariable("questionId") @Positive Long questionId) {
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
