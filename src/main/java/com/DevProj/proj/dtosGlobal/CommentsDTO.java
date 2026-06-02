package com.DevProj.proj.dtosGlobal;

import java.time.LocalDateTime;

public record CommentsDTO(
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
