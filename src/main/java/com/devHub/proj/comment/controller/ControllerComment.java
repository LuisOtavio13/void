package com.devHub.proj.comment.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.devHub.proj.comment.dto.request.CreateCommentRequest;
import com.devHub.proj.comment.service.CommentService;
import com.devHub.proj.dto.CommentDTO;
import com.devHub.proj.models.User;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class ControllerComment {

    private final CommentService commentsService;

    public ControllerComment(CommentService commentsService) {
        this.commentsService = commentsService;
    }

    @PostMapping
    public ResponseEntity<CommentDTO> createComment(
        @Valid @RequestBody CreateCommentRequest request,
        @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentsService.createComment(request, user));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<CommentDTO>> getByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(commentsService.getCommentsByProject(projectId));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<CommentDTO> like(@PathVariable Long id) {
        return ResponseEntity.ok(commentsService.likeComment(id));
    }

    @PostMapping("/{id}/dislike")
    public ResponseEntity<CommentDTO> dislike(@PathVariable Long id) {
        return ResponseEntity.ok(commentsService.dislikeComment(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal User user) {
        commentsService.deleteComment(id, user);
        return ResponseEntity.noContent().build();
    }
}
