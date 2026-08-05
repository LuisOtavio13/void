package com.devHub.proj.features.post.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record CreatePostRequest(
    @NotBlank String name,
    String LinkGithub,
    String linkProjeto,
    @NotBlank String description,
    List<TagRequest> tags
) {}
