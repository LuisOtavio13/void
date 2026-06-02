package com.DevProj.proj.auth.controllerAuth;

import com.DevProj.proj.auth.dtoAuth.request.LoginRequest;
import com.DevProj.proj.auth.dtoAuth.request.RegistrationRequest;
import com.DevProj.proj.auth.dtoAuth.response.LoginResponse;
import com.DevProj.proj.auth.dtoAuth.response.RegistrationResponse;
import com.DevProj.proj.auth.exception.EmailAlreadyExistsException;
import com.DevProj.proj.auth.service.ServiceAuth;
import com.DevProj.proj.dtosGlobal.UserDTO;
import com.DevProj.proj.models.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class ControllerAuth {

    private final ServiceAuth serviceAuth;

    public ControllerAuth(ServiceAuth serviceAuth) {
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
    public ResponseEntity<RegistrationResponse> register(
        @Valid @RequestBody RegistrationRequest registroRequest
    ) throws EmailAlreadyExistsException {
        User user = serviceAuth.saveUser(
            registroRequest.username(),
            registroRequest.password(),
            registroRequest.email()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(
            new RegistrationResponse(user.getName(), user.getUsername())
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
