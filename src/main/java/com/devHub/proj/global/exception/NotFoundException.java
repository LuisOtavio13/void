package com.devHub.proj.global.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super("Not found: " + message);
    }
}
