package com.DevProj.proj.comments.controller;

import com.DevProj.proj.comments.dto.request.CreateCommentRequest;
import com.DevProj.proj.comments.service.CommentsService;
import com.DevProj.proj.dtosGlobal.CommentsDTO;
import com.DevProj.proj.models.Users;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentsController {

    private final CommentsService commentsService;

    public CommentsController(CommentsService commentsService) {
        this.commentsService = commentsService;
    }

    @PostMapping
    public ResponseEntity<CommentsDTO> createComment(
        @Valid @RequestBody CreateCommentRequest request,
        @AuthenticationPrincipal Users user
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentsService.createComment(request, user));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<CommentsDTO>> getByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(commentsService.getCommentsByProject(projectId));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<CommentsDTO> like(@PathVariable Long id) {
        return ResponseEntity.ok(commentsService.likeComment(id));
    }

    @PostMapping("/{id}/dislike")
    public ResponseEntity<CommentsDTO> dislike(@PathVariable Long id) {
        return ResponseEntity.ok(commentsService.dislikeComment(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal Users user) {
        commentsService.deleteComment(id, user);
        return ResponseEntity.noContent().build();
    }
}
