package com.devHub.proj.post.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super("Not found: " + message);
    }
}
