package com.DevProj.proj.auth.config;

import com.DevProj.proj.models.User;
import com.DevProj.proj.repository.UserRepo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final UserRepo userRepo;
    private final Jwt jwt;

    public JwtFilter(UserRepo userRepo, Jwt jwt) {
        this.userRepo = userRepo;
        this.jwt = jwt;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(7);

        String email = jwt.validateToken(token);
        if (
            email != null &&
            SecurityContextHolder.getContext().getAuthentication() == null
        ) {
            User user = userRepo.findByEmail(email).orElse(null);
            if (user != null) {
                UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities()
                    );
                authenticationToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(
                    authenticationToken
                );
            }
        }
        filterChain.doFilter(request, response);
    }
}
