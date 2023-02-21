package com.teambj.stackoverflow.domain.comment.controller;

import com.teambj.stackoverflow.domain.comment.dto.CommentDto;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.comment.mapper.CommentMapper;
import com.teambj.stackoverflow.domain.comment.service.CommentService;
import com.teambj.stackoverflow.response.ApiResponse;
import com.teambj.stackoverflow.utils.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {
    public static final String DEFALUT_URL = "/comments";

    private final CommentService commentService;
    private final CommentMapper commentMapper;

    @PostMapping
    // @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postComment(@Valid @RequestBody CommentDto.Post commentDto) {
        Comment comment = commentService.createComment(commentMapper.commentDtoPostToComment(commentDto));
        URI uri = UriUtil.createUri(DEFALUT_URL, comment.getCommentId());

        return ResponseEntity.created(uri).body(ApiResponse.created());
    }

    @PatchMapping
    // @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> patchComment(@Valid @RequestBody CommentDto.Patch commentDto) {
        Comment comment = commentService.updateComment(commentMapper.commentDtoPatchToComment(commentDto));
        CommentDto.Response response = commentMapper.commentToCommentResponseDto(comment);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @DeleteMapping("/{comment-id}")
    // @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteComment(@Positive @PathVariable("comment-id") Long commentId) {
        commentService.deleteComment(commentId);

        return ResponseEntity.noContent().build();
    }
}
