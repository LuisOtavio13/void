package com.DevProj.proj.posts.repository;

import com.DevProj.proj.posts.model.Tag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepo extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);
}
