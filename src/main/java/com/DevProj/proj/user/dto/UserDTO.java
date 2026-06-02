package com.DevProj.proj.user.dto;

public record UserDTO(
    boolean isAdmin,
    String name,
    Long id,
    String photo,
    String email
) {}
