package com.DevProj.proj.globalExceptionHandler;

import com.DevProj.proj.auth.exception.EmailAlreadyExistsException;
import com.DevProj.proj.auth.exception.InvalidLoginException;
import com.DevProj.proj.posts.exception.PostLenException;
import java.time.LocalDateTime;
import java.util.HashMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<
        HashMap<String, String>
    > handleEmailAlreadyExistsException(EmailAlreadyExistsException e) {
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
}
