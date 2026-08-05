package com.devHub.proj.features.like.dto;

public record ReactionCountAndStatus(long likes,
                boolean like,
                long deslikes,
                boolean deslike) {

}
