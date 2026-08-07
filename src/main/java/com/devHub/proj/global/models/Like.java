package com.devHub.proj.global.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "likes")
@Getter
@Setter
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_like", nullable = false)
    private Boolean liked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    public Like() {}
    public Like(Long id, boolean liked, User user, Project project, LocalDateTime createdAt) {
        this.id = id;
        this.liked = liked;
        this.user = user;
        this.project = project;
        this.createdAt = createdAt;
    }
    public Like(boolean liked, User user, Project project) {
        this.liked = liked;
        this.user = user;
        this.project = project;
        this.createdAt = LocalDateTime.now();
    }    
}