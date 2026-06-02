package com.DevProj.proj.posts.dto.response;

import java.time.LocalDateTime;

public record UserResponse(
    String name,
    Long id,
    String avatar,
    String description,
    boolean isVerified,
    boolean isAdmin,
    LocalDateTime createdAt
) {}
