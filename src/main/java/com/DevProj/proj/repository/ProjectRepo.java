package com.DevProj.proj.repository;

import com.DevProj.proj.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepo extends JpaRepository<Project, Long> {}
