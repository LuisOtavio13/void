package com.devHub.proj.global.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity(name = "Users")
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public User() {}

    public User(String username, String password, String email) {
        this.name = username;
        this.password = password;
        this.email = email;
        this.bio = "";
        this.role = "USER";
        this.avatar_url = "";
    }
    public User(String name, String password, String email, Long id) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.bio = "";
        this.id = id;
        this.role = "USER";
        this.avatar_url = "";
    }

    @Column(nullable = false, name = "username")
    private String name;

    @Column(nullable = false)
    private String password;

    private String bio;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String avatar_url;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private LocalDateTime created_at;

    @Column(nullable = false)
    private LocalDateTime updated_at;

    @OneToMany(mappedBy = "owner")
    private List<Project> projects;

    @OneToMany(mappedBy = "userId")
    private List<Comment> comments;

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
