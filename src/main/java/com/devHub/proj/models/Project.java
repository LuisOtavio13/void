package com.devHub.proj.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "Projects")
public class Project {

    public Project() {}

    public Project(
        String name,
        String github_url,
        String link_url,
        String description,
        Set<Like> likes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<Tag> tags,
        User owner
    ) {
        this.name = name;
        this.github_url = github_url;
        this.link_url = link_url;
        this.description = description;
        this.likes = likes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tags = tags;
        this.owner = owner;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String github_url;

    private String link_url;

    @Column(columnDefinition = "text")
    private String description;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Like> likes = new HashSet<Like>();


    @Column(nullable = false, name = "created_at")
    private LocalDateTime createdAt;

    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
        name = "has_tag",
        joinColumns = @JoinColumn(name = "project_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;
    @Column(name = "likes_count", nullable = false)
    private int likesCount = 0;
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "projectId")
    private java.util.List<Comment> comments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGithub_url() {
        return github_url;
    }

    public void setGithub_url(String github_url) {
        this.github_url = github_url;
    }

    public String getLink_url() {
        return link_url;
    }

    public void setLink_url(String link_url) {
        this.link_url = link_url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Like> getLikes() {
        return likes;
    }

    public void setLikes(Set<Like> likes) {
        this.likes = likes;
    }
    public void addLike(Like like) {
    this.likes.add(like);
    like.setProject(this); 
    this.likesCount = this.likes.size(); 
}
public void removeLike(Like like) {
    this.likes.remove(like);
    this.likesCount = this.likes.size();
}

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public java.util.List<Comment> getComments() {
        return comments;
    }

    public void setComments(java.util.List<Comment> comments) {
        this.comments = comments;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }
}
