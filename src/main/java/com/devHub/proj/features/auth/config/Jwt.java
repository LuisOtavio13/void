package com.devHub.proj.features.auth.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.devHub.proj.global.models.User;

import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class Jwt {

    private final String secretKey = "aaaaaaaaaaaaaaaaaa";

    public String generateToken(User user) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
            .withSubject(user.getUsername())
            .withClaim("username", user.getUsername())
            .withClaim("role", user.getRole())
            .withExpiresAt(
                new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)
            )
            .withIssuedAt(new Date(System.currentTimeMillis()))
            .sign(algorithm);
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);

            return JWT.require(algorithm).build().verify(token).getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}
