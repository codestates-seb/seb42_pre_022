package com.teambj.stackoverflow.domain.question.entity;

import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.comment.entity.Comment;
import com.teambj.stackoverflow.domain.user.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = true)
    private String title;

    @Column(nullable = false)
    private String body;

    @Column(columnDefinition = "integer default 0")
    private int answerCount;

    @Column(columnDefinition = "integer default 0")
    private int viewCount;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<QuestionTag> questionTags = new ArrayList<>();

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_Id")
    private User user;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<Answer> answer = new ArrayList<>();

    public void addUser(User user) {
        this.user = user;
    }

    public void addQuestionTag(QuestionTag questionTag) {
        questionTags.add(questionTag);
    }

    public void setAnswerCount(int answerCount) {
        this.answerCount = answerCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }
}
