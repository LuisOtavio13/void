package com.devHub.proj.features.post.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record ProjectsResponse(
    String title,
    Long id,
    String description,
    List<String> tags,
    UserResponse user,
    String githubLink,
    String demoLink,
    Long likesCount,
    Long desLikesCount,
    Boolean isLikedByUser,
    Boolean isDesLikedByUser,
    Boolean thisUserIsOwner,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
