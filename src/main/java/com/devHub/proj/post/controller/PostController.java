package com.devHub.proj.post.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devHub.proj.models.Project;
import com.devHub.proj.models.User;
import com.devHub.proj.post.dto.request.CreatePostRequest;
import com.devHub.proj.post.dto.response.ProjectsResponse;
import com.devHub.proj.post.dto.response.UserResponse;
import com.devHub.proj.post.service.PostService;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService servicesPosts;

    public PostController(PostService servicesPosts) {
        this.servicesPosts = servicesPosts;
    }

    @PostMapping("/new")
    public ResponseEntity<String> createPost(
            @Valid @RequestBody CreatePostRequest post,
            @AuthenticationPrincipal User user) throws RuntimeException {
        try {
            servicesPosts.createPost(post, user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public Page<ProjectsResponse> getAllPosts(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return servicesPosts.getAllPosts(user, page, size);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        servicesPosts.deletePost(id);
    }

    @GetMapping("/{id}")
    public ProjectsResponse getPostById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        final Project post = servicesPosts.getPostById(id);
        boolean isOwner = false;
        if (user != null) {
            isOwner = post.getOwner().getId().equals(user.getId());
        }
        return new ProjectsResponse(
                post.getName(),
                post.getId(),
                post.getDescription(),
                post.getTags().stream().map(tag -> tag.getName()).toList(),
                new UserResponse(
                        post.getOwner().getName(),
                        post.getOwner().getId(),
                        post.getOwner().getAvatar_url(),
                        post.getOwner().getBio(),
                        false,
                        post.getOwner().getRole().equals("ADMIN"),
                        post.getOwner().getCreated_at()),
                post.getGithub_url(),
                post.getLink_url(),
                isOwner,
                post.getCreatedAt(),
                post.getUpdatedAt());
    }

    @PostMapping("/{id}/update")
    public ResponseEntity<String> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody CreatePostRequest post,
            @AuthenticationPrincipal User user) throws Exception {

        final Project existingPost = servicesPosts.getPostById(id);
        if (!existingPost.getOwner().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("You are not authorized to update this post.");
        }
        servicesPosts.updatePost(id, post);

        return ResponseEntity.ok().build();
    }
}