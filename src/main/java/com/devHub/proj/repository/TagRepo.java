package com.devHub.proj.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devHub.proj.models.Tag;

@Repository
public interface TagRepo extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);
}
