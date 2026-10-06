package com.devHub.proj.features.like.dto;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

public record ReactionCommentResponse(Long Id, @JsonUnwrapped ReactionCountAndStatus reactionCountAndStatus) {
}
