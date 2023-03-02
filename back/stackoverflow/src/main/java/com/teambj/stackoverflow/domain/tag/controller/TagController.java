package com.teambj.stackoverflow.domain.tag.controller;

import com.teambj.stackoverflow.domain.tag.dto.TagResponseDto;
import com.teambj.stackoverflow.domain.tag.entity.Tag;
import com.teambj.stackoverflow.domain.tag.mapper.TagMapper;
import com.teambj.stackoverflow.domain.tag.service.TagService;
import com.teambj.stackoverflow.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tags")
@Validated
public class TagController {
    private final TagService tagService;
    private final TagMapper mapper;

    public TagController(TagService tagService, TagMapper mapper) {
        this.tagService = tagService;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity getAllTags() {
        List<Tag> tagList = tagService.getAllTags();
        List<TagResponseDto> response = mapper.tagsToTagResponseDtos(tagList);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }
}
