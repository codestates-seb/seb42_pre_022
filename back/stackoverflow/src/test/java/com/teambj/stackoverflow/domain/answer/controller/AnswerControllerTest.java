package com.teambj.stackoverflow.domain.answer.controller;

import com.teambj.stackoverflow.restdocs.annotations.WithMockUserCustom;
import com.teambj.stackoverflow.domain.answer.dto.AnswerDto;
import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.answer.mapper.AnswerMapper;
import com.teambj.stackoverflow.domain.answer.service.AnswerService;
import com.teambj.stackoverflow.domain.comment.dto.CommentDto;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.question.service.QuestionService;
import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.restdocs.ControllerTest;
import com.teambj.stackoverflow.restdocs.support.ConstrainedFields;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.teambj.stackoverflow.restdocs.custom.CustomRequestFieldsSnippet.customRequestFields;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AnswerController.class)
class AnswerControllerTest extends ControllerTest {
    private final String DEFAULT_URL = "/answers";

    @MockBean
    UserService userService;

    @MockBean
    QuestionService questionService;

    @MockBean
    AnswerService answerService;

    @MockBean
    AnswerMapper answerMapper;

    private Map<String, Object> userResource;
    private Answer answer;
    private AnswerDto.Response answerDtoResponse;
    private List<Answer> answerList;
    private List<AnswerDto.Response> answerListResponse;

    @BeforeEach
    void setUp() {
        userResource = userResource();
        LocalDateTime now = LocalDateTime.now();

        CommentDto.Response commentDtoResponse =
            new CommentDto.Response((UserDto.Response) userResource.get("UserDtoResponse"), 1L, "Comment body", now, now);

        List<CommentDto.Response> commentList = new ArrayList<>() {{ add(commentDtoResponse); }};

        answer = new Answer(1L, "Answer Body", new Question(), (User) userResource.get("User"), new ArrayList<>());
        answerDtoResponse = new AnswerDto.Response((UserDto.Response) userResource.get("UserDtoResponse"), 1L, "Answer Body", now, now, commentList);
        answerList = new ArrayList<>() {{ add(answer); }};
        answerListResponse = new ArrayList<>() {{ add(answerDtoResponse); }};
    }

    @Test
    @DisplayName("[?????????] ?????? ?????? :: ?????? ????????? ??????")
    @WithMockUserCustom
    void postAnswersTest() throws Exception {
        given(userService.getUser(Mockito.anyLong()))
            .willReturn((User) userResource.get("User"));

        given(questionService.findQuestion(Mockito.anyLong()))
            .willReturn(new Question());

        given(answerMapper.answerDtoPostToAnswer(Mockito.any(AnswerDto.Post.class)))
            .willReturn(answer);

        given(answerService.createAnswer(Mockito.any(Answer.class)))
            .willReturn(answer);

        ConstrainedFields constrainedFields = new ConstrainedFields(AnswerDto.Post.class);

        postResource(DEFAULT_URL, new AnswerDto.Post(1L, "Answer Body"))
            .andExpect(status().isCreated())
            .andExpect(header().exists("Location"))
            .andDo(restDocs.document(
                customRequestFields(
                    "custom-request",
                    List.of(
                        constrainedFields.withPath("questionId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                        constrainedFields.withPath("body").type(JsonFieldType.STRING).description("?????? ?????? ??????")
                    ).toArray(FieldDescriptor[]::new)
                ),
                responseHeaders(
                    headerWithName("Location").description("?????? ????????? ?????? ??????")
                )
            ));
    }

    @Test
    @DisplayName("[?????????] ?????? ?????? ?????? :: ?????? ????????? ??????")
    void getAnswersTest() throws Exception {
        given(answerService.findAnswers(Mockito.anyLong()))
            .willReturn(answerList);

        given(answerMapper.answerListToAnswerResponseDtoList(answerList))
            .willReturn(answerListResponse);

        getResource(DEFAULT_URL + "?questionId={questionId}", 1)
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.body.data[*].answerId").isNotEmpty())
            .andExpect(jsonPath("$.body.data[*].body").isNotEmpty())
            .andDo(restDocs.document(
                    requestParameters(
                        parameterWithName("questionId").description("?????? ?????????")
                    ),
                    genRelaxedResponseFields("body.data[]")
                )
            );
    }

    @Test
    @DisplayName("[?????????] ?????? ?????? ??????")
    void getAnswerTest() throws Exception {
        given(answerService.findAnswer(Mockito.anyLong()))
            .willReturn(answer);

        given(answerMapper.answerToAnswerResponseDto(Mockito.any(Answer.class)))
            .willReturn(answerDtoResponse);

        getResource(DEFAULT_URL + "/{answer-id}", 1)
            .andExpect(status().isOk())
            .andDo(restDocs.document(
                pathParameters(
                    parameterWithName("answer-id").description("?????? ?????????")
                ),
                genRelaxedResponseFields("body.data")
            ));
    }

    @Test
    @WithMockUserCustom
    @DisplayName("[?????????] ?????? ?????? ??????")
    void patchAnswerTest() throws Exception {
        given(answerService.findAnswer(Mockito.anyLong()))
            .willReturn(answer);

        given(answerMapper.answerDtoPatchToAnswer(Mockito.any(AnswerDto.Patch.class)))
            .willReturn(answer);

        given(answerService.updateAnswer(Mockito.any(Answer.class)))
            .willReturn(answer);

        given(answerMapper.answerToAnswerResponseDto(Mockito.any(Answer.class)))
            .willReturn(answerDtoResponse);

        ConstrainedFields constrainedFields = new ConstrainedFields(AnswerDto.Patch.class);

        patchResource(DEFAULT_URL, new AnswerDto.Patch(1L, "Modified"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.body.data.answerId").isNotEmpty())
            .andExpect(jsonPath("$.body.data.body").isNotEmpty())
            .andDo(restDocs.document(
                customRequestFields(
                    "custom-request",
                    List.of(
                        constrainedFields.withPath("answerId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                        constrainedFields.withPath("body").type(JsonFieldType.STRING).description("?????? ?????? ??????")
                    ).toArray(FieldDescriptor[]::new)
                ),
                genRelaxedResponseFields("body.data")
            ));
    }

    @Test
    @WithMockUserCustom
    @DisplayName("[?????????] ?????? ??????")
    void deleteAnswerTest() throws Exception {
        given(answerService.findAnswer(Mockito.anyLong()))
            .willReturn(answer);

        Mockito.doNothing().when(answerService).deleteAnswer(Mockito.anyLong());

        deleteResource(DEFAULT_URL + "/{answer-id}", 1)
            .andExpect(status().isNoContent())
            .andDo(restDocs.document(
                pathParameters(
                    parameterWithName("answer-id").description("?????? ?????????")
                )
            ));
    }

    private ResponseFieldsSnippet genRelaxedResponseFields(String beneath) {
        return relaxedResponseFields(
            beneathPath(beneath).withSubsectionId("data"),
            fieldWithPath("user").type(JsonFieldType.OBJECT).description("?????? ?????????"),
            fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
            fieldWithPath("body").type(JsonFieldType.STRING).description("?????? ?????? ??????"),
            fieldWithPath("createdDate").type(JsonFieldType.STRING).description("?????? ?????? ??????"),
            fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("?????? ?????? ?????? ??????"),
            fieldWithPath("comments[]").type(JsonFieldType.ARRAY).description("?????? ?????????")
        );
    }
}
