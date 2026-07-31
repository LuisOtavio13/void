package com.devHub.proj.auth.exception;

public class AuthException extends Exception {

    public AuthException(String message) {
        super("Auth: " + message);
    }
}
