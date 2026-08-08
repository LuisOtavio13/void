package com.devHub.proj.features.post.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreatePostRequest(
    @NotBlank String name,
    @NotNull String LinkGithub,
    @NotNull String linkProjeto,
    @NotBlank String description,
    List<TagRequest> tags
) {}
