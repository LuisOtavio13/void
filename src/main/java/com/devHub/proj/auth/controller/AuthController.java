package com.devHub.proj.auth.controller;

import jakarta.validation.Valid;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devHub.proj.auth.dto.request.LoginRequest;
import com.devHub.proj.auth.dto.request.RegistroRequest;
import com.devHub.proj.auth.dto.response.LoginResponse;
import com.devHub.proj.auth.dto.response.RegistroResponse;
import com.devHub.proj.auth.exception.EmailAlreadyExistsException;
import com.devHub.proj.auth.service.AuthService;
import com.devHub.proj.dto.UserDTO;
import com.devHub.proj.models.User;

@RequestMapping("/auth")
@RestController
public class AuthController {

    private final AuthService serviceAuth;

    public AuthController(AuthService serviceAuth) {
        this.serviceAuth = serviceAuth;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
        @Valid @RequestBody LoginRequest loginRequest
    ) throws Exception {
        if (
            !serviceAuth.loginIsValid(
                loginRequest.email(),
                loginRequest.password()
            )
        ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        String token = serviceAuth.gerarToken(
            loginRequest.email(),
            loginRequest.password()
        );
        User user = serviceAuth.findByEmail(loginRequest.email());

        return ResponseEntity.ok(
            new LoginResponse(
                token,
                user.getRole().contains("ADMIN"),
                user.getName(),
                user.getId(),
                user.getAvatar_url(),
                user.getUsername()
            )
        );
    }

    @PostMapping("/register")
    public ResponseEntity<RegistroResponse> register(
        @Valid @RequestBody RegistroRequest registroRequest
    ) throws EmailAlreadyExistsException {
        User user = serviceAuth.saveUser(
            registroRequest.username(),
            registroRequest.password(),
            registroRequest.email()
        );
        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("auth/user/{id}")
            .buildAndExpand(user.getId())
            .toUri();
        return ResponseEntity.created(uri).body(
            new RegistroResponse(user.getName(), user.getUsername())
        );
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMe(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
            new UserDTO(
                user.getRole().equals("ADMIN"),
                user.getName(),
                user.getId(),
                user.getAvatar_url(),
                user.getUsername()
            )
        );
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        User foundUser = serviceAuth.findById(id);
        if (foundUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(
            new UserDTO(
                foundUser.getRole().equals("ADMIN"),
                foundUser.getName(),
                foundUser.getId(),
                foundUser.getAvatar_url(),
                foundUser.getUsername()
            )
        );
    }
}
