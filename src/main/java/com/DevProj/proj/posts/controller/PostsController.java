package com.DevProj.proj.posts.controller;

import com.DevProj.proj.posts.dto.request.CreatePostRequest;
import com.DevProj.proj.posts.dto.response.ProjectsReponse;
import com.DevProj.proj.posts.dto.response.UserResponse;
import com.DevProj.proj.posts.model.Project;
import com.DevProj.proj.posts.model.Tag;
import com.DevProj.proj.posts.service.PostService;
import com.DevProj.proj.user.model.User;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostsController {

    private final PostService servicesPosts;

    public PostsController(PostService servicesPosts) {
        this.servicesPosts = servicesPosts;
    }

    @PostMapping("/new")
    public void createPost(
        @Valid @RequestBody CreatePostRequest post,
        @AuthenticationPrincipal User user
    ) throws RuntimeException {
        servicesPosts.createPost(post, user);
    }

    @GetMapping
    public Page<ProjectsReponse> getAllPosts(
        @AuthenticationPrincipal User user,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return servicesPosts.getAllPosts(user, page, size);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        servicesPosts.deletePost(id);
    }

    @GetMapping("/{id}")
    public ProjectsReponse getPostById(
        @PathVariable Long id,
        @AuthenticationPrincipal User user
    ) {
        final Project post = servicesPosts.getPostById(id);
        boolean isOwner = false;
        if (user != null) {
            isOwner = post.getOwner().getId().equals(user.getId());
        }
        return new ProjectsReponse(
            post.getName(),
            post.getId(),
            post.getDescription(),
            post.getTags().stream().map(Tag::getName).toList(),
            new UserResponse(
                post.getOwner().getName(),
                post.getOwner().getId(),
                post.getOwner().getAvatar_url(),
                post.getOwner().getBio(),
                false,
                post.getOwner().getRole().equals("ADMIN"),
                post.getOwner().getCreated_at()
            ),
            post.getGithub_url(),
            post.getLink_url(),
            isOwner,
            post.getCreatedAt(),
            post.getUpdatedAt()
        );
    }
}
