package com.teambj.stackoverflow.domain.answer.mapper;

import com.teambj.stackoverflow.domain.answer.dto.AnswerDto;
import com.teambj.stackoverflow.domain.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
  AnswerMapper INSTANCE = Mappers.getMapper(AnswerMapper.class);

  Answer answerDtoPostToAnswer(AnswerDto.Post answerDto);
  Answer answerDtoPatchToAnswer(AnswerDto.Patch answerDto);
  AnswerDto.Response answerToAnswerResponseDto(Answer answer);
  List<AnswerDto.Response> answerListToAnswerResponseDtoList(List<Answer> answer);
}
