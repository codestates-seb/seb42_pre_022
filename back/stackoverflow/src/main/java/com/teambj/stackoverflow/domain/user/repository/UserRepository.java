package com.teambj.stackoverflow.domain.user.repository;

import com.teambj.stackoverflow.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Page<User> OrderByReputationDesc(Pageable pageable);
}
