package com.teambj.stackoverflow.auth.mail;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
@NoArgsConstructor
public class ConfirmationToken {

    private static final long EMAIL_TOKEN_EXPIRATION_TIME_VALUE = 5L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(length = 36)
    private String id;


    @Column
    private Boolean expired;

    @Column
    private Long userId;

    public static ConfirmationToken createEmailConfirmationToken(Long userId){
        ConfirmationToken confirmationToken = new ConfirmationToken();
        confirmationToken.userId = userId;
        confirmationToken.expired = false;
        return confirmationToken;
    }

}
