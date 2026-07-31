package com.devHub.proj.dto;

public record UserDTO(
    boolean isAdmin,
    String name,
    Long id,
    String photo,
    String email
) {}
