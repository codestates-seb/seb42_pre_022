package com.teambj.stackoverflow.restdocs.annotations;

import com.teambj.stackoverflow.restdocs.support.WithMockUserCustomSecurityContextFactory;
import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockUserCustomSecurityContextFactory.class)
public @interface WithMockUserCustom {
    String username() default "username";
    String role() default "USER";
}
