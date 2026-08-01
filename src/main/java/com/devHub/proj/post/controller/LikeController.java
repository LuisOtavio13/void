package com.devHub.proj.post.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devHub.proj.models.User;
import com.devHub.proj.post.service.LikeService;

@RestController
@RequestMapping("/posts/likes")
public class LikeController {

    private LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Void> likePost(@PathVariable Long postId, @AuthenticationPrincipal User user) {
        likeService.likePost(postId, user);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> unlikePost(@PathVariable Long postId, @AuthenticationPrincipal User user) {
        likeService.unlikePost(postId, user);
        return ResponseEntity.ok().build();
    }
}
