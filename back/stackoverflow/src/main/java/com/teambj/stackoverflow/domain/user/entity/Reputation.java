package com.teambj.stackoverflow.domain.user.entity;

import com.teambj.stackoverflow.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Reputation extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reputationId;

    @Column(nullable = false)
    private int amount = 1;

    @OneToOne(mappedBy = "reputation")
    private User user;

    public void setUser(User user) {
        this.user = user;
        if (user.getReputation() != this) {
            user.setReputation(this);
        }
    }

}
