package com.teambj.stackoverflow.domain.question.dto;

import com.teambj.stackoverflow.domain.answer.dto.AnswerDto;
import com.teambj.stackoverflow.domain.comment.dto.CommentDto;
import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import com.teambj.stackoverflow.domain.tag.dto.TagResponseDto;
import com.teambj.stackoverflow.domain.user.dto.UserDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class QuestionResponseDto {
    private Long questionId;
    private UserDto.Response user;
    private String title;
    private String body;
    private Long answerCount;
    private Long viewCount;
    private List<TagResponseDto> tagList;
    private List<CommentDto.Response> comments;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}
