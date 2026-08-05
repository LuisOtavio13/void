package com.devHub.proj.global.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devHub.proj.global.models.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserIdAndProjectId(Long userId, Long projectId);
    long countByProjectIdAndLiked(Long projectId, boolean liked);

}
