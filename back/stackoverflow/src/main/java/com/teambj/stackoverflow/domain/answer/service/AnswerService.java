package com.teambj.stackoverflow.domain.answer.service;

import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.answer.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public Answer findAnswer(Long questionId) {
        Optional<Answer> byId = answerRepository.findById(questionId);

        return byId.orElseThrow(() -> new RuntimeException("등록된 답변이 없습니다."));
    }

    public List<Answer> findAnswers() {
        return answerRepository.findAll();
    }
}
