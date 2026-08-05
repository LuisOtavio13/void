package com.devHub.proj.features.auth.exception;

public class AuthException extends Exception {

    public AuthException(String message) {
        super("Auth: " + message);
    }
}
