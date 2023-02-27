package com.teambj.stackoverflow.domain.tag.repository;

import com.teambj.stackoverflow.domain.tag.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    @Override
    @Query("SELECT m FROM Tag m")
    List<Tag> findAll();

    public Optional<Tag> findByTagName(String tagName);
}
