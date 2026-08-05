package com.devHub.proj.features.post.dto.request;

import jakarta.validation.constraints.NotBlank;

public record TagRequest(@NotBlank String name) {}
