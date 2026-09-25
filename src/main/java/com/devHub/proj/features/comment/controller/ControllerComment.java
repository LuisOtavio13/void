package com.devHub.proj.features.comment.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.devHub.proj.features.comment.dto.request.CreateCommentRequest;
import com.devHub.proj.features.comment.service.CommentService;
import com.devHub.proj.global.dto.CommentDTO;
import com.devHub.proj.global.models.User;

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
    public ResponseEntity<List<CommentDTO>> getByProject(@PathVariable Long projectId,
                                                        @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(commentsService.getCommentsByProject(projectId, user));
    }

   

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal User user) {
        commentsService.deleteComment(id, user);
        return ResponseEntity.noContent().build();
    }
}
