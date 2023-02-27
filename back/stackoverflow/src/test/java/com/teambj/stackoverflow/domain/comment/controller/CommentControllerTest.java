package com.teambj.stackoverflow.domain.comment.controller;

import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.comment.dto.CommentDto;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.comment.mapper.CommentMapper;
import com.teambj.stackoverflow.domain.comment.service.CommentService;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.restdocs.ControllerTest;
import com.teambj.stackoverflow.restdocs.annotations.WithMockUserCustom;
import com.teambj.stackoverflow.restdocs.support.ConstrainedFields;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.teambj.stackoverflow.restdocs.custom.CustomRequestFieldsSnippet.customRequestFields;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CommentController.class)
class CommentControllerTest extends ControllerTest {
    public static final String DEFALUT_URL = "/comments";

    @MockBean
    private UserService userService;

    @MockBean
    private CommentService commentService;

    @MockBean
    private  CommentMapper commentMapper;

    private Map<String, Object> userResource;
    private Comment comment;
    private CommentDto.Response commentDtoResponse;
    private List<CommentDto.Response> commentList;

    @BeforeEach
    void setUp() {
        userResource = userResource();
        LocalDateTime now = LocalDateTime.now();

        comment = new Comment(1L, "Comment body", (User) userResource.get("User"), new Question(), new Answer());
        commentDtoResponse = new CommentDto.Response((UserDto.Response) userResource.get("UserDtoResponse"), 1L, "Comment body", now, now);
        commentList = new ArrayList<>() {{ add(commentDtoResponse); }};
    }

    @Test
    @DisplayName("[테스트] 댓글 생성 :: 답변 식별자 기준")
    @WithMockUserCustom
    void postCommentTestWithQuestion() throws Exception {
        given(userService.getUser(Mockito.anyLong()))
            .willReturn((User) userResource.get("User"));

        given(commentMapper.commentDtoPostToComment(Mockito.any(CommentDto.Post.class)))
            .willReturn(comment);

        given(commentService.createComment(Mockito.any(Comment.class)))
            .willReturn(comment);

        ConstrainedFields constrainedFields = new ConstrainedFields(CommentDto.Post.class);

        postResource(DEFALUT_URL, new CommentDto.Post(null, 1L, "Comment Body"))
            .andExpect(status().isCreated())
            .andExpect(header().exists("Location"))
            .andDo(restDocs.document(
                customRequestFields(
                    "custom-request",
                    List.of(
                        constrainedFields.withPath("questionId").optional().type(JsonFieldType.NUMBER).description("질문 식별자"),
                        constrainedFields.withPath("answerId").optional().type(JsonFieldType.NUMBER).description("답변 식별자"),
                        constrainedFields.withPath("body").optional().type(JsonFieldType.STRING).description("댓글 본문 내용")
                    ).toArray(FieldDescriptor[]::new)
                ),
                responseHeaders(
                    headerWithName("Location").description("댓글 리소스 생성 위치")
                )
            ));
    }

    @Test
    @DisplayName("[테스트] 댓글 생성 :: 답변 식별자 기준")
    @WithMockUserCustom
    void postCommentTestWithAnswer() throws Exception {
        given(userService.getUser(Mockito.anyLong()))
            .willReturn((User) userResource.get("User"));

        given(commentMapper.commentDtoPostToComment(Mockito.any(CommentDto.Post.class)))
            .willReturn(comment);

        given(commentService.createComment(Mockito.any(Comment.class)))
            .willReturn(comment);

        ConstrainedFields constrainedFields = new ConstrainedFields(CommentDto.Post.class);

        postResource(DEFALUT_URL, new CommentDto.Post(1L, null, "Comment Body"))
            .andExpect(status().isCreated())
            .andExpect(header().exists("Location"))
            .andDo(restDocs.document(
                customRequestFields(
                    "custom-request",
                    List.of(
                        constrainedFields.withPath("questionId").optional().type(JsonFieldType.NUMBER).description("질문 식별자"),
                        constrainedFields.withPath("answerId").optional().type(JsonFieldType.NUMBER).description("답변 식별자"),
                        constrainedFields.withPath("body").optional().type(JsonFieldType.STRING).description("댓글 본문 내용")
                    ).toArray(FieldDescriptor[]::new)
                ),
                responseHeaders(
                    headerWithName("Location").description("댓글 리소스 생성 위치")
                )
            ));
    }

    @Test
    void patchCommentTest() {
    }

    @Test
    void deleteComment() {
    }
}
