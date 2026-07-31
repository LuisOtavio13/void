package com.devHub.proj.dto;

import java.time.LocalDateTime;

public record CommentDTO(
    long id,
    String content,
    String username,
    Long userId,
    String avatarUrl,
    int likes,
    int dislikes,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
