package com.teambj.stackoverflow.domain.answer.controller;

import com.teambj.stackoverflow.auth.PrincipalDetails;
import com.teambj.stackoverflow.domain.answer.dto.AnswerDto;
import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.answer.mapper.AnswerMapper;
import com.teambj.stackoverflow.domain.answer.service.AnswerService;
import com.teambj.stackoverflow.domain.question.entity.Question;
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
import java.util.Objects;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/answers")
public class AnswerController {
    public static final String DEFAULT_URI = "/answers";

    private final UserService userService;
    private final QuestionService questionService;

    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postAnswer(
        @Valid @RequestBody AnswerDto.Post answerDto,
        @AuthenticationPrincipal PrincipalDetails userDetails
    ) {
        User user = userService.getUser(userDetails.getUserId());
        Question question = questionService.findQuestion(answerDto.getQuestionId());

        Answer answer = answerMapper.answerDtoPostToAnswer(answerDto);
        answer.setUser(user);
        answer.setQuestion(question);

        Answer createdAnswer = answerService.createAnswer(answer);
        URI uri = UriUtil.createUri(DEFAULT_URI, createdAnswer.getAnswerId());

        return ResponseEntity.created(uri).body(ApiResponse.created());
    }

    @GetMapping("{answer-id}")
    public ResponseEntity<?> getAnswer(@PathVariable("answer-id") Long answerId) {
        Answer answer = answerService.findAnswer(answerId);
        AnswerDto.Response response = answerMapper.answerToAnswerResponseDto(answer);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @GetMapping
    public ResponseEntity<?> getAnswers(@Positive @RequestParam Long questionId) {
        List<Answer> answers = answerService.findAnswers(questionId);
        List<AnswerDto.Response> responses = answerMapper.answerListToAnswerResponseDtoList(answers);

        return ResponseEntity.ok().body(ApiResponse.ok("data", responses));
    }

    @PatchMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> patchAnswer(
        @Valid @RequestBody AnswerDto.Patch answerDto,
        @AuthenticationPrincipal PrincipalDetails userDetails
    ) {
        Answer findAnswer = answerService.findAnswer(answerDto.getAnswerId());

        if (!Objects.equals(findAnswer.getUser().getUserId(), userDetails.getUserId()))
            throw new RuntimeException("수정 권한이 없습니다.");

        Answer answer = answerService.updateAnswer(answerMapper.answerDtoPatchToAnswer(answerDto));
        AnswerDto.Response response = answerMapper.answerToAnswerResponseDto(answer);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @DeleteMapping("/{answer-id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteAnswer(
        @Positive @PathVariable("answer-id") Long answerId,
        @AuthenticationPrincipal PrincipalDetails userDetails
    ) {
        Answer findAnswer = answerService.findAnswer(answerId);

        if (!Objects.equals(findAnswer.getUser().getUserId(), userDetails.getUserId()))
            throw new RuntimeException("삭제 권한이 없습니다.");

        answerService.deleteAnswer(answerId);

        return ResponseEntity.noContent().build();
    }
}
