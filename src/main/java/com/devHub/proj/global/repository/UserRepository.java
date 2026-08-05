package com.devHub.proj.global.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.devHub.proj.global.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
