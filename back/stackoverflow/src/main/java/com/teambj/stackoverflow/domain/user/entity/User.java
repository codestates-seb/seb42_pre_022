package com.teambj.stackoverflow.domain.user.entity;

import com.teambj.stackoverflow.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends Auditable {

    public User(String email) {
        this.email = email;
    }

    public User(String email, String password,Boolean emailVerified, Reputation reputation, String displayName) {
        this.email = email;
        this.password = password;
        this.emailVerified = emailVerified;
        this.reputation = reputation;
        this.displayName = displayName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column
    private String displayName;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String profileImage = "default";

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reputation_id")
    private Reputation reputation;

    @Column
    private Boolean emailVerified = false;

}
