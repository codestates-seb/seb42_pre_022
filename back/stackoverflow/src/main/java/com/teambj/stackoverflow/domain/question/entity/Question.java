package com.teambj.stackoverflow.domain.question.entity;

import com.teambj.stackoverflow.domain.user.entity.User;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;

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

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String body;

    private Long answerCount;

    private Long viewCount;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

    private LocalDateTime closedAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    //@OneToMany(mappedBy = "", cascade = CascadeType.REMOVE)
    //private List<Answer> answer = new ArrayList<>();

    public void addUser(User user) {
        this.user = user;
    }

    public void setAnswerCount(Long answerCount) {
        this.answerCount = answerCount;
    }

    public void setViewCount(Long viewCount) {
        this.viewCount = viewCount;
    }
}
