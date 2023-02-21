package com.teambj.stackoverflow.domain.answer.controller;

import com.teambj.stackoverflow.auth.CustomUserDetailsService;
import com.teambj.stackoverflow.domain.answer.dto.AnswerDto;
import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.answer.mapper.AnswerMapper;
import com.teambj.stackoverflow.domain.answer.service.AnswerService;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.mapper.QuestionMapper;
import com.teambj.stackoverflow.domain.question.service.QuestionService;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.response.ApiResponse;
import com.teambj.stackoverflow.utils.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/answers")
public class AnswerController {
    public static final String DEFAULT_URI = "/answer";

    private final UserService userService;
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    @PostMapping
    public ResponseEntity<?> postAnswer(
        @Valid @RequestBody AnswerDto.Post answerDto,
        @AuthenticationPrincipal CustomUserDetailsService.UserPrincipal userDetails
    ) {
        System.out.println("userDetails = " + userDetails);
        // User user = userService.findUser(userDetails);
        Question question = questionService.findQuestion(answerDto.getQuestionId());

        Answer answer = answerMapper.answerDtoPostToAnswer(answerDto);
        // answer.setUser(user);
        answer.setQuestion(question);

        Answer createdAnswer = answerService.createAnswer(answer);
        URI uri = UriUtil.createUri(DEFAULT_URI, createdAnswer.getAnswerId());

        return ResponseEntity.created(uri).body(ApiResponse.created());
    }

    @GetMapping
    public ResponseEntity<?> getAnswers(@Positive @RequestParam Long questionId) {
        List<Answer> answers = answerService.findAnswers(questionId);
        List<AnswerDto.Response> responses = answerMapper.answerListToAnswerResponseDtoList(answers);

        return ResponseEntity.ok().body(ApiResponse.ok("data", responses));
    }

    @PatchMapping
    public ResponseEntity<?> patchAnswer(@Valid @RequestBody AnswerDto.Patch answerDto) {
        Answer answer = answerService.updateAnswer(answerMapper.answerDtoPatchToAnswer(answerDto));
        AnswerDto.Response response = answerMapper.answerToAnswerResponseDto(answer);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity<?> deleteAnswer(@Positive @PathVariable("answer-id") Long answerId) {
        answerService.deleteAnswer(answerId);

        return ResponseEntity.noContent().build();
    }
}
