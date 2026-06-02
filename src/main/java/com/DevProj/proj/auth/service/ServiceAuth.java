package com.DevProj.proj.auth.service;

import com.DevProj.proj.auth.config.Jwt;
import com.DevProj.proj.auth.exception.EmailAlreadyExistsException;
import com.DevProj.proj.auth.exception.InvalidLoginException;
import com.DevProj.proj.auth.model.User;
import com.DevProj.proj.auth.repository.UserRepo;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ServiceAuth {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final Jwt jwt;

    public ServiceAuth(
        UserRepo userRepo,
        PasswordEncoder passwordEncoder,
        AuthenticationManager authenticationManager,
        Jwt jwt
    ) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwt = jwt;
    }

    public String gerarToken(String email, String password) {
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(email, password);
        Authentication authentication = authenticationManager.authenticate(
            authenticationToken
        );

        User user = (User) authentication.getPrincipal();

        String token = jwt.generateToken(user);
        return token;
    }

    public User saveUser(String username, String password, String email)
        throws EmailAlreadyExistsException {
        User user = new User(username, passwordEncoder.encode(password), email);
        try {
            userRepo.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new EmailAlreadyExistsException();
        }

        return user;
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    public boolean loginIsValid(String email, String password)
        throws Exception {
        if (password.length() > 25) {
            throw new InvalidLoginException();
        }
        return true;
    }

    public User findById(Long id) {
        return userRepo.findById(id).orElse(null);
    }
}
