package com.teambj.stackoverflow.domain.comment.entity;

import com.teambj.stackoverflow.audit.Auditable;
import com.teambj.stackoverflow.domain.answer.entity.Answer;
import com.teambj.stackoverflow.domain.question.entity.Question;
import com.teambj.stackoverflow.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(length = 100)
    private String body;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

     public void addQuestion(Question question) {
         this.question = question;

         if (!question.getComments().contains(this)) {
             question.getComments().add(this);
         }
     }

    public void addAnswer(Answer answer) {
        this.answer = answer;

        if (!answer.getComments().contains(this)) {
            answer.getComments().add(this);
        }
    }
}
