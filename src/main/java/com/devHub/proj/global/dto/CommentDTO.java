package com.devHub.proj.global.dto;

import java.time.LocalDateTime;

import com.devHub.proj.features.post.dto.response.UserResponse;

public record CommentDTO(
    long id,
    UserResponse user,
    String content,
    Long likesCount,
    Long desLikesCount,
    Boolean isLikedByUser,
    Boolean isDesLikedByUser,
    Boolean thisUserIsOwner,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
