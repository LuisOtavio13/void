package com.DevProj.proj.auth.dto.response;

public record LoginResponse(
    String jwt,
    boolean isAdmin,
    String name,
    Long id,
    String photo,
    String email
) {}
