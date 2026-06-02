package com.DevProj.proj.repository;

import com.DevProj.proj.models.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepo extends JpaRepository<Comment, Long> {
    List<Comment> findByProjectId_Id(Long projectId);
}
