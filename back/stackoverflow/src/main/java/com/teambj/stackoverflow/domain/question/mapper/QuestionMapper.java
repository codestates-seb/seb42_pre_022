package com.teambj.stackoverflow.domain.question.mapper;

import com.teambj.stackoverflow.domain.question.dto.QuestionPostDto;
import com.teambj.stackoverflow.domain.question.dto.QuestionResponseDto;
import com.teambj.stackoverflow.domain.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    public Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
    public QuestionResponseDto questionToQuestionResponseDto(Question question);
    List<QuestionResponseDto> questionToQuestionResponseDtos(List<Question> questions);
}
