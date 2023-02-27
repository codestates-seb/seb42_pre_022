package com.teambj.stackoverflow.domain.tag.mapper;

import com.teambj.stackoverflow.domain.tag.dto.TagPostDto;
import com.teambj.stackoverflow.domain.tag.dto.TagResponseDto;
import com.teambj.stackoverflow.domain.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    TagResponseDto tagToTagResponseDto(Tag tag);

    List<TagResponseDto> tagsToTagResponseDtos(List<Tag> tags);

    List<TagPostDto> tagsToTagPostDtos(List<Tag> tags);
}
