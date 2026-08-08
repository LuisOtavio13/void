package com.devHub.proj.global.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devHub.proj.global.models.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    long countByProjectIdAndLiked(Long projectId, boolean liked);

    long countByCommentIdAndLiked(Long commentId, boolean liked);

    Optional<Like> findByUserIdAndProjectId(
            Long userId,
            Long projectId);

    Optional<Like> findByUserIdAndCommentId(
            Long userId,
            Long commentId);

}
