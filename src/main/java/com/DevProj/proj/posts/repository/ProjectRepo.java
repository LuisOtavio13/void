package com.DevProj.proj.posts.repository;

import com.DevProj.proj.posts.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepo extends JpaRepository<Project, Long> {}
