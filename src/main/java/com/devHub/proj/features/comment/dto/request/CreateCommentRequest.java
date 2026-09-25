package com.devHub.proj.features.comment.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCommentRequest(
    @NotBlank(message = "Content is required") String content,
    @NotNull(message = "Project ID is required") Long projectId,
    Long parentCommentId
) {}
