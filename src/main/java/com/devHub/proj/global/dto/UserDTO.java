package com.devHub.proj.global.dto;

public record UserDTO(
    boolean isAdmin,
    String name,
    Long id,
    String photo,
    String email
) {}
