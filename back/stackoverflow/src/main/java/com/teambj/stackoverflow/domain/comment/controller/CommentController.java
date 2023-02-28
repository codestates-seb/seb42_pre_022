package com.teambj.stackoverflow.domain.comment.controller;

import com.teambj.stackoverflow.auth.PrincipalDetails;
import com.teambj.stackoverflow.domain.comment.dto.CommentDto;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.comment.mapper.CommentMapper;
import com.teambj.stackoverflow.domain.comment.service.CommentService;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.exception.BusinessLogicException;
import com.teambj.stackoverflow.exception.ExceptionCode;
import com.teambj.stackoverflow.response.ApiResponse;
import com.teambj.stackoverflow.utils.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.Objects;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {
    public static final String DEFALUT_URL = "/comments";

    private final UserService userService;
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postComment(
        @Valid @RequestBody CommentDto.Post commentDto,
        @AuthenticationPrincipal PrincipalDetails userDetails
    ) {
        User user = userService.getUser(userDetails.getUserId());
        Comment comment = commentMapper.commentDtoPostToComment(commentDto);
        comment.setUser(user);

        Comment createdComment = commentService.createComment(comment);
        URI uri = UriUtil.createUri(DEFALUT_URL, createdComment.getCommentId());

        return ResponseEntity.created(uri).body(ApiResponse.created());
    }

    @PatchMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> patchComment(
        @Valid @RequestBody CommentDto.Patch commentDto,
        @AuthenticationPrincipal PrincipalDetails userDetails
    ) {
        Comment findComment = commentService.findComment(commentDto.getCommentId());
        if (!Objects.equals(findComment.getUser().getUserId(), userDetails.getUserId()))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

        Comment comment = commentService.updateComment(commentMapper.commentDtoPatchToComment(commentDto));
        CommentDto.Response response = commentMapper.commentToCommentResponseDto(comment);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @DeleteMapping("/{comment-id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteComment(
        @Positive @PathVariable("comment-id") Long commentId,
        @AuthenticationPrincipal PrincipalDetails userDetails
    ) {
        Comment findComment = commentService.findComment(commentId);
        if (!Objects.equals(findComment.getUser().getUserId(), userDetails.getUserId()))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

        commentService.deleteComment(commentId);

        return ResponseEntity.noContent().build();
    }
}
