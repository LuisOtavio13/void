package com.DevProj.proj.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record LoginRequest(
    @Email(message = "Invalid email")
    @NotNull(message = "Email is required")
    String email,
    @NotNull(message = "Password is required") String password
) {}
