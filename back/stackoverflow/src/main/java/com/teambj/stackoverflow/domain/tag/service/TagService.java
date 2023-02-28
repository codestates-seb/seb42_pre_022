package com.teambj.stackoverflow.domain.tag.service;

import com.teambj.stackoverflow.domain.tag.entity.Tag;
import com.teambj.stackoverflow.domain.tag.repository.TagRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    private Tag verifyTag(Tag tag) {
        Optional<Tag> optionalTag = tagRepository.findByTagName(tag.getTagName());

        return optionalTag.orElseGet(() -> tagRepository.save(tag));
    }
}