package com.teambj.stackoverflow.domain.comment.service;

import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.answer.service.AnswerService;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.comment.repository.CommentRepository;
import com.teambj.stackoverflow.domain.question.service.QuestionService;
import com.teambj.stackoverflow.utils.CustomBeanUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CustomBeanUtil<Comment> customBeanUtil;

    /*
     * # 코멘트 등록
     *
     */
    public Comment createComment(Comment comment) {
        return saveComment(comment);
    }

    /*
     * # 코멘트 조회 (질문)
     *
     */
    public void findQuestionComments(Long questionId) {
    }

    /*
     * # 코멘트 조회 (답변)
     *
     */
    public List<Comment> findAnswerComments(Long answerId) {
        return commentRepository.findAnswerComments(answerId);
    }

    /*
     * # 코멘트 수정
     *
     */
    public Comment updateComment(Comment comment) {
        Comment verifiedComment = findVerifiedComment(comment.getCommentId());
        Comment updatedComment = customBeanUtil.copyNonNullProperties(comment, verifiedComment);

        return saveComment(updatedComment);

    }

    /*
     * # 코멘트 삭제
     *
     */
    public void deleteComment(Long commentId) {
        Comment verifiedComment = findVerifiedComment(commentId);

        commentRepository.delete(verifiedComment);
    }

    /*
     * # 코멘트 검증
     *
     */
    private Comment findVerifiedComment(Long commentId) {
        Optional<Comment> byId = commentRepository.findById(commentId);

        return byId.orElseThrow(() -> new RuntimeException("등록된 코멘트가 없습니다."));
    }

    /*
     * # 코멘트 저장
     *
     */
    private Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }
}
