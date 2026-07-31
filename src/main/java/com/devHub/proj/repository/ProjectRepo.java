package com.devHub.proj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devHub.proj.models.Project;
@Repository
public interface ProjectRepo extends JpaRepository<Project, Long> {}
