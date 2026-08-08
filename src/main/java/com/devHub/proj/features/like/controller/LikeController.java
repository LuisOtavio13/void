package com.devHub.proj.features.like.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devHub.proj.features.like.service.LikeService;
import com.devHub.proj.global.models.User;

@RestController
@RequestMapping("/likes")
public class LikeController {

    private LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PutMapping("/project/{postId}/like")
    public ResponseEntity<Void> likeProject(@PathVariable Long postId, @AuthenticationPrincipal User user) {
        likeService.updateReactionProject(postId, user, true);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/project/{postId}/deslike")
    public ResponseEntity<Void> deslikeProject(@PathVariable Long postId, @AuthenticationPrincipal User user) {
        likeService.updateReactionProject(postId, user, false);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/comment/{commentId}/like")
    public ResponseEntity<Void> likeComment(@PathVariable Long commentId, @AuthenticationPrincipal User user) {
        likeService.updateReactionComment(commentId, user, true);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/comment/{commentId}/deslike")
    public ResponseEntity<Void> deslikeComment(@PathVariable Long commentId, @AuthenticationPrincipal User user) {
        likeService.updateReactionComment(commentId, user, false);
        return ResponseEntity.ok().build();
    }
}
