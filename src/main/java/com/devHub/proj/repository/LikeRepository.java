package com.devHub.proj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devHub.proj.models.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    
}
