package com.teambj.stackoverflow.domain.question.entity;

import com.teambj.stackoverflow.domain.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class QuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionTagId;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    public void  addQuestion(Question question) {
        this.question = question;
        question.addQuestionTag(this);
    }

    public void addTag(Tag tag) {
        this.tag = tag;
        tag.addQuestionTag(this);
    }
}
