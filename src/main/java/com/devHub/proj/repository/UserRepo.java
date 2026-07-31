package com.devHub.proj.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.devHub.proj.models.User;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
