package com.devHub.proj.features.event.service;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EventType {
    
    POST_CREATED("post.created"),
    POST_UPDATED("post.updated"),
    POST_DELETED("post.deleted"),
    REACTION_PROJECT_UPDATED("post.reaction.updated"),

    COMMENT_CREATED("comment.created"),
    COMMENT_DELETED("comment.deleted"),
    REACTION_COMMENT_UPDATED("comment.reaction.updated"),

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
