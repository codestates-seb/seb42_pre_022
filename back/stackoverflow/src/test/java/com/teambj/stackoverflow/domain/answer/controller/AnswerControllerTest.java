package com.teambj.stackoverflow.domain.answer.controller;

import com.teambj.stackoverflow.domain.answer.dto.AnswerDto;
import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.answer.mapper.AnswerMapper;
import com.teambj.stackoverflow.domain.answer.service.AnswerService;
import com.teambj.stackoverflow.domain.comment.dto.CommentDto;
import com.teambj.stackoverflow.domain.question.service.QuestionService;
import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.Reputation;
import com.teambj.stackoverflow.domain.user.service.UserService;
import com.teambj.stackoverflow.restdocs.ControllerTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.teambj.stackoverflow.restdocs.custom.CustomRequestFieldsSnippet.customRequestFields;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.attributes;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AnswerController.class)
// @MockBean(JpaMetamodelMappingContext.class)
class AnswerControllerTest extends ControllerTest {
    @MockBean
    UserService userService;

    @MockBean
    QuestionService questionService;

    @MockBean
    AnswerService answerService;

    @MockBean
    AnswerMapper answerMapper;

    private Answer answer;
    private AnswerDto.Response answerDtoResponse;
    private List<Answer> answerList;
    private List<AnswerDto.Response> answerListResponse;

    @BeforeEach
    void beforeEach() {
        LocalDateTime now = LocalDateTime.now();

        UserDto.Response user =
            new UserDto.Response(1L, "test@test.com", "tester", new Reputation());

        CommentDto.Response commentDtoResponse =
            new CommentDto.Response(user,1L, "Comment body", now, now);
        List<CommentDto.Response> commentList = new ArrayList<>() {{ add(commentDtoResponse);}};


        answer = new Answer();
        answerDtoResponse = new AnswerDto.Response(user, 1L,"Answer Body", now, now, commentList);
        answerList = new ArrayList<>() {{ add(answer); }};
        answerListResponse = new ArrayList<>() {{ add(answerDtoResponse); }};
    }

    @Test
    // @WithMockUser
    @DisplayName("질문에 포함된 답변 전체 조회 테스트")
    void getAnswersTest() throws Exception {
        // Mock
        given(answerService.findAnswers(Mockito.anyLong()))
            .willReturn(answerList);

        given(answerMapper.answerListToAnswerResponseDtoList(answerList))
            .willReturn(answerListResponse);

        ResultActions actions = mockMvc.perform(
            get("/answers?questionId={questionId}", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isOk())
            .andExpect(jsonPath("$.body.data[*].answerId").isNotEmpty())
            .andExpect(jsonPath("$.body.data[*].body").isNotEmpty())
            .andDo(restDocs.document(
                    requestParameters(
                        parameterWithName("questionId").description("질문 식별자")
                    ),
                    // customRequestFields("custom-request-fields",
                    //     attributes(attrField("title", "custom-fields")),
                    //     List.of(
                    //         fieldWithPath("user").type(JsonFieldType.OBJECT).description("회원 데이터")
                    //     ).toArray(FieldDescriptor[]::new)
                    // ),
                    relaxedResponseFields(
                        beneathPath("body.data[]").withSubsectionId("data"),
                        List.of(
                            fieldWithPath("user").type(JsonFieldType.OBJECT).description("회원 데이터"),
                            fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                            fieldWithPath("body").type(JsonFieldType.STRING).description("답변 내용"),
                            fieldWithPath("createdDate").type(JsonFieldType.STRING).description("답변 내용"),
                            fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("답변 생성 일자"),
                            fieldWithPath("comments[]").type(JsonFieldType.ARRAY).description("답변 댓글 데이터")
                        )
                    )
                )
            );
    }

    @Test
    @DisplayName("질문 내용 수정 테스트")
    void patchAnswer() throws Exception {
        given(answerService.findAnswer(Mockito.anyLong()))
            .willReturn(answer);

        given(answerService.updateAnswer(Mockito.any(Answer.class)))
            .willReturn(answer);

        given(answerMapper.answerToAnswerResponseDto(Mockito.any(Answer.class)))
            .willReturn(answerDtoResponse);

        ResultActions actions = mockMvc.perform(
            patch("/answers")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new AnswerDto.Patch(1L, "Modified")))
        );

        actions.andExpect(status().isOk());
    }
}
