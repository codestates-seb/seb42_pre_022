package com.teambj.stackoverflow.domain.tag.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TagResponseDto {
    private Long tagId;
    private String tagName;
}
