package com.devHub.proj.features.event.service;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EventType {
    
    POST_CREATED("post.created"),
    POST_UPDATED("post.updated"),
    POST_LIKED("post.liked"),
    POST_DELETED("post.deleted"),

    COMMENT_CREATED("comment.created"),
    COMMENT_DELETED("comment.deleted"),

    NOTIFICATION_CREATED("notification.created");

    private final String value;

    EventType(String value) {
        this.value = value;
    }

    @JsonValue
    public String value() {
        return value;
    }
}
