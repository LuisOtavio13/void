package com.devHub.proj.features.auth.exception;

public class InvalidLoginException extends AuthException {

    public InvalidLoginException() {
        super("Password must be at most 25 characters long");
    }
}
