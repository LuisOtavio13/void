package com.DevProj.proj.auth.dtoAuth.request;

import jakarta.validation.constraints.NotNull;

public record RegistrationRequest(
    @NotNull(message = "Username is required") String username,
    @NotNull(message = "Email is required") String email,
    @NotNull(message = "Password is required") String password
) {}
