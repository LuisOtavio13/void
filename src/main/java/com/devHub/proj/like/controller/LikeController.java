package com.devHub.proj.like.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devHub.proj.like.service.LikeService;
import com.devHub.proj.models.User;

@RestController
@RequestMapping("/posts/likes")
public class LikeController {

    private LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PutMapping("/{postId}/like")
    public ResponseEntity<Void> like(@PathVariable Long postId, @AuthenticationPrincipal User user) {
        likeService.updateReaction(postId, user, true);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{postId}/deslike")
    public ResponseEntity<Void> deslike(@PathVariable Long postId, @AuthenticationPrincipal User user) {
        likeService.updateReaction(postId, user, false);
        return ResponseEntity.ok().build();
    }
}
