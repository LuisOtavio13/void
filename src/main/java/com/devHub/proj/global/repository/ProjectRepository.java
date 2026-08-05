package com.devHub.proj.global.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devHub.proj.global.models.Project;
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {}
