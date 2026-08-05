package com.devHub.proj.features.auth.dto.request;

import jakarta.validation.constraints.NotNull;

public record RegistroRequest(
    @NotNull(message = "Username is required") String username,
    @NotNull(message = "Email is required") String email,
    @NotNull(message = "Password is required") String password
) {}
