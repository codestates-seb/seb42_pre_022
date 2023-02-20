package com.teambj.stackoverflow.domain.answer.entity;

import com.teambj.stackoverflow.audit.Auditable;
import com.teambj.stackoverflow.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(length = 100) // columnDefinition = "TEXT"
    private String body;

    // @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    // @JoinColumn(name = "QUESTION_ID")
    // private Question question;

    // @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    // @JoinColumn(name = "USERS_ID")
    // private User user;

    // @ManyToOne(fetch = FetchType.Lazy, cascade = CascadeType.PERSIST)
    // @JoinColumn(name = "COMMENT_ID")
    // private Comment comment;

    // public void addQuestion(Question question) {
    //     this.question = question;
    //
    //     if (question.getAnswer() != this) user.setAnswer(this);
    // }

    // public void setUser(User user) {
    //     this.user = user;
    //
    //     if (user.getAnswer() != this) user.setAnswer(this);
    // }
}
