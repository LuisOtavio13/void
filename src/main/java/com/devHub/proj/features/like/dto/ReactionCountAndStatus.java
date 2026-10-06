package com.devHub.proj.features.like.dto;

public record ReactionCountAndStatus(long likesCount,
                boolean isLikedByUser,
                long desLikesCount,
                boolean isDesLikedByUser) {

}
