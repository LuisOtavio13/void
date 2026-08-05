package com.devHub.proj.global.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.devHub.proj.global.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByProjectId_Id(Long projectId);
}
