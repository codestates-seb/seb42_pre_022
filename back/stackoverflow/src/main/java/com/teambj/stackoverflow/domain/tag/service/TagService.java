package com.teambj.stackoverflow.domain.tag.service;

import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import com.teambj.stackoverflow.domain.tag.entity.Tag;
import com.teambj.stackoverflow.domain.tag.repository.TagRepository;
import com.teambj.stackoverflow.exception.BusinessLogicException;
import com.teambj.stackoverflow.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TagService {
    private TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> createByTagName(List<String> tagNames) {
        return tagNames.stream()
                .filter(tag -> !tag.isEmpty())
                .map(String::trim)
                .map(tag -> new Tag(tag))
                .map(this::verifyTag)
                .collect(Collectors.toList());
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public List<Tag> findTags(List<QuestionTag> questionTagList){

        return questionTagList.stream()
                .map(questionTag -> {
                    Optional<Tag> findTag = tagRepository.findById(questionTag.getTag().getTagId());
                    return findTag.orElseThrow(() ->
                            new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
                })
                .collect(Collectors.toList());
    }

    private Tag verifyTag(Tag tag) {
        Optional<Tag> optionalTag = tagRepository.findByTagName(tag.getTagName());

        return optionalTag.orElseGet(() -> tagRepository.save(tag));
    }
}
