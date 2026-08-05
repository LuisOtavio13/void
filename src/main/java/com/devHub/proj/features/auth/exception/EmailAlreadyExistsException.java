package com.devHub.proj.features.auth.exception;

public class EmailAlreadyExistsException extends AuthException {

    public EmailAlreadyExistsException() {
        super("Email already exists");
    }
}
