package com.teambj.stackoverflow.domain.tag.entity;

import com.teambj.stackoverflow.domain.question.entity.QuestionTag;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column(unique = true, nullable = false)
    private String tagName;

    @ToString.Exclude
    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<QuestionTag> questionTags = new ArrayList<>();

    public Tag(String tagName) {
        this.tagName = tagName;
    }

    public void addQuestionTag(QuestionTag questionTag) {
        questionTags.add(questionTag);
    }
}
