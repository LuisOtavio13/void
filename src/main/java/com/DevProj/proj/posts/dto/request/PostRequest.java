package com.DevProj.proj.posts.dto.request;

import java.time.LocalDateTime;
import java.util.List;

public record PostRequest(
    String name,
    String LinkGithub,
    String linkProjeto,
    long likes,
    String description,
    List<TagRequest> tags,
    UserOwnerPost owner,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
