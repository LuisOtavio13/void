package com.devHub.proj.features.post.controller;

import jakarta.validation.Valid;

import java.util.List;

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

import com.devHub.proj.features.event.service.EventType;
import com.devHub.proj.features.event.service.SseEventService;
import com.devHub.proj.features.post.dto.request.CreatePostRequest;
import com.devHub.proj.features.post.dto.response.ProjectsResponse;
import com.devHub.proj.features.post.service.ProjectService;
import com.devHub.proj.global.exception.NotFoundException;
import com.devHub.proj.global.models.User;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final ProjectService servicesPosts;
    private final SseEventService proPostService;
    public PostController(ProjectService servicesPosts, SseEventService proPostService) {
        this.servicesPosts = servicesPosts;
        this.proPostService = proPostService;
    }

    @PostMapping("/new")
    public ResponseEntity<String> createPost(
            @Valid @RequestBody CreatePostRequest post,
            @AuthenticationPrincipal User user) throws RuntimeException {

        ProjectsResponse projectsResponse = servicesPosts.createProject(post, user);
        proPostService.sendEvent(EventType.POST_CREATED, projectsResponse);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public Page<ProjectsResponse> getAllPosts(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return servicesPosts.getAllProjects(user, page, size);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id, @AuthenticationPrincipal User user) throws NotFoundException {
        servicesPosts.deleteProject(id, user);
        proPostService.sendEvent(EventType.POST_DELETED, java.util.Map.of("postId", id));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ProjectsResponse getPostById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return servicesPosts.getProjectDetails(id, user);
    }

    @PostMapping("/{id}/update")
    public ResponseEntity<String> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody CreatePostRequest post,
            @AuthenticationPrincipal User user) throws Exception {

        servicesPosts.updateProject(id, post, user);
        ProjectsResponse updatedPost = servicesPosts.getProjectDetails(id, user);
        proPostService.sendEvent(EventType.POST_UPDATED, updatedPost);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProjectsResponse>> getProjectsByUserId(
        @PathVariable Long userId,
        @AuthenticationPrincipal  User user
    ){
        User user2 = servicesPosts.getUserById(userId);
        if(user2 == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(servicesPosts.getProjectsByOwnerName(user2, user));
    }
}