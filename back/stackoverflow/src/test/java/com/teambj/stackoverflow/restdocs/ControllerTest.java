package com.teambj.stackoverflow.restdocs;

import com.google.gson.Gson;
import com.teambj.stackoverflow.domain.user.dto.UserDto;
import com.teambj.stackoverflow.domain.user.entity.Reputation;
import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.restdocs.config.RestDocsConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.snippet.Attributes;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


@Import(RestDocsConfig.class)
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
@MockBean(JpaMetamodelMappingContext.class)
public abstract class ControllerTest {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected Gson gson;

    @Autowired
    protected RestDocumentationResultHandler restDocs;

    @BeforeEach
    void setUp(final WebApplicationContext ctx, final RestDocumentationContextProvider provider) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
                           .apply(MockMvcRestDocumentation.documentationConfiguration(provider))
                           .alwaysDo(MockMvcResultHandlers.print())
                           .alwaysDo(restDocs)
                           .addFilters(new CharacterEncodingFilter("UTF-8", true))
                           .build();
    }

    // # defined Attribute
    public static Attributes.Attribute defineField(final String key, final String value) {
        return new Attributes.Attribute(key, value);
    }

    public static Attributes.Attribute defineConstraint(final String value) {
        return new Attributes.Attribute("constraints", value);
    }

    public Map<String, Object> userResource() {
        Map<String, Object> userMap = new HashMap<>();

        String profileURI = "https://source.boringavatars.com/beam/120/" + 1L + "?colors=66FFFF,8CBFE6,B380CC,D940B3,FF0099";

        User user = new User();
        user.setUserId(1L);

        UserDto.Response userDtoResponse =
            new UserDto.Response(1L, "test@test.com", "tester", profileURI, new Reputation());

        userMap.put("User", user);
        userMap.put("UserDtoResponse", userDtoResponse);

        return userMap;
    }

    protected <T> ResultActions postResource(String url, T body) throws Exception {
        return mockMvc.perform(
            post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(gson.toJson(body))
        );
    }

    protected ResultActions getResource(String url, Object... pathVariables) throws Exception {
        return mockMvc.perform(
            get(url, pathVariables)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        );
    }

    protected ResultActions getResources(String url, MultiValueMap<String, String> parameters) throws Exception {
        return mockMvc.perform(
            get(url)
                .params(parameters)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        );
    }

    protected ResultActions patchResource(String url, Object... pathVariables) throws Exception {
        return mockMvc.perform(
            patch(url, pathVariables)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        );
    }

    protected <T> ResultActions patchResource(String url, T body) throws Exception {
        return mockMvc.perform(
            patch(url)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(gson.toJson(body))
        );
    }

    protected <T> ResultActions deleteResource(String url, Object... pathVariables) throws Exception {
        return mockMvc.perform(
            delete(url, pathVariables)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        );
    }
}
