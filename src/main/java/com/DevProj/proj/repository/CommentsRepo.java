package com.DevProj.proj.repository;

import com.DevProj.proj.models.Comments;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepo extends JpaRepository<Comments, Long> {
    List<Comments> findByProjectId_Id(Long projectId);
}
