package com.devHub.proj.post.dto.response;

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
    int likesCount,
    Boolean isLikedByUser,
    Boolean thisUserIsOwner,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
