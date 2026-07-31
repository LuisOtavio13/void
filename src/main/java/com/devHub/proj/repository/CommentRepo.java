package com.devHub.proj.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.devHub.proj.models.Comment;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    List<Comment> findByProjectId_Id(Long projectId);
}
