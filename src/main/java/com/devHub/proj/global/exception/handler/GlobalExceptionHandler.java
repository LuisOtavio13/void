package com.devHub.proj.global.exception.handler;

import java.time.LocalDateTime;
import java.util.HashMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.devHub.proj.features.auth.exception.EmailAlreadyExistsException;
import com.devHub.proj.features.auth.exception.InvalidLoginException;
import com.devHub.proj.features.post.exception.PostLenException;
import com.devHub.proj.global.exception.NotFoundException;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<
        HashMap<String, String>
    > handleEmailAlreadyExistsException(EmailAlreadyExistsException e) {
        log.error(e.getMessage());
        HashMap<String, String> response = new HashMap<>();
        response.put("error", e.getMessage());
        response.put("date", LocalDateTime.now().toString());
        response.put("status", HttpStatus.CONFLICT.toString());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(InvalidLoginException.class)
    public ResponseEntity<HashMap<String, String>> handleInvalidLoginException(
        InvalidLoginException e
    ) {
        HashMap<String, String> response = new HashMap<>();
        response.put("error", e.getMessage());
        response.put("date", LocalDateTime.now().toString());
        response.put("status", HttpStatus.BAD_REQUEST.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(PostLenException.class)
    public ResponseEntity<HashMap<String, String>> handlePostLenException(
        PostLenException e
    ) {
        HashMap<String, String> response = new HashMap<>();
        response.put("error", e.getMessage());
        response.put("date", LocalDateTime.now().toString());
        response.put("status", HttpStatus.BAD_REQUEST.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<HashMap<String, String>> handleNotFoundException(
        NotFoundException e
    ) {
        HashMap<String, String> response = new HashMap<>();
        response.put("error", e.getMessage());
        response.put("date", LocalDateTime.now().toString());
        response.put("status", HttpStatus.NOT_FOUND.toString());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
