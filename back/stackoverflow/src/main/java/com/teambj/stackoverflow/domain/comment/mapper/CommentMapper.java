package com.teambj.stackoverflow.domain.comment.mapper;

import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.comment.dto.CommentDto;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

    default Comment commentDtoPostToComment(CommentDto.Post commentDto) {
        Comment comment = new Comment();
        comment.setBody(commentDto.getBody());

        if (commentDto.getQuestionId() != null) {}

        if (commentDto.getAnswerId() != null) {
            Answer answer = new Answer();
            answer.setAnswerId(commentDto.getAnswerId());
            comment.addAnswer(answer);
        }

        return comment;
    };

    Comment commentDtoPatchToComment(CommentDto.Patch commentDto);

    CommentDto.Response commentToCommentResponseDto(Comment comment);
}
