package com.teambj.stackoverflow.domain.answer.controller;

import com.teambj.stackoverflow.domain.answer.dto.AnswerDto;
import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.answer.mapper.AnswerMapper;
import com.teambj.stackoverflow.domain.answer.service.AnswerService;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.response.ApiResponse;
import com.teambj.stackoverflow.utils.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/answers")
public class AnswerController {
    public static final String DEFAULT_URI = "/answer";

    private final UserService userService;
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    @PostMapping
    public ResponseEntity<?> postAnswer(@Valid @RequestBody AnswerDto.Post requestBody, Principal principal) {
        /*
         * # 로그인 회원 정보 조회 및 연관 관계 매핑 진행 예정
         *
         */
        // if (principal == null) throw new RuntimeException("등록된 회원 정보가 없습니다.");
        // User user = userService.findUser(principal.getName()); 회원 아이디 기준 SEQ_ID 조회 후 연관관계 맵핑

        Answer answer = answerMapper.answerDtoPostToAnswer(requestBody);
        // answer.setUser(user);

        Answer createdAnswer = answerService.createAnswer(answer);

        URI uri = UriUtil.createUri(DEFAULT_URI, createdAnswer.getAnswerId());

        return ResponseEntity.created(uri).body(ApiResponse.created());
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity<?> getAnswer(@Positive @PathVariable("answer-id") Long questionId) {
        Answer answer = answerService.findAnswer(questionId);
        AnswerDto.Response response = answerMapper.answerToAnswerResponseDto(answer);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @GetMapping
    public ResponseEntity<?> getAnswers() {
        List<Answer> answers = answerService.findAnswers();
        List<AnswerDto.Response> responses = answerMapper.answerToAnswerResponseDtoList(answers);

        return ResponseEntity.ok().body(ApiResponse.ok("data", responses));
    }
}
