package com.devHub.proj.post.dto.request;

import jakarta.validation.constraints.NotBlank;

public record TagRequest(@NotBlank String name) {}
