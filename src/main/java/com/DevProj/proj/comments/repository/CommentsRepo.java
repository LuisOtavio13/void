package com.DevProj.proj.comments.repository;

import com.DevProj.proj.comments.model.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepo extends JpaRepository<Comment, Long> {
    List<Comment> findByProjectId_Id(Long projectId);
}
