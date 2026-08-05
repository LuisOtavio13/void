package com.devHub.proj.features.post.exception;

public class PostLenException extends RuntimeException {

    public PostLenException(String message, int min, int max) {
        super(
            String.format(
                "Name must be between %d and %d characters: %s",
                min,
                max,
                message
            )
        );
    }
}
