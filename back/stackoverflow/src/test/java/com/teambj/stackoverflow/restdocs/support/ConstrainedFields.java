package com.teambj.stackoverflow.restdocs.support;

import org.springframework.restdocs.constraints.ConstraintDescriptions;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.snippet.Attributes;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

public class ConstrainedFields {
    private final ConstraintDescriptions constraintDescriptions;

    public ConstrainedFields(Class<?> clazz) {
        this.constraintDescriptions = new ConstraintDescriptions(clazz);
    }

    public FieldDescriptor withPath(String path) {
        return fieldWithPath(path)
                   .attributes(
                       Attributes.key("constraints")
                           .value(this.constraintDescriptions.descriptionsForProperty(path))
                   );
    }
}
