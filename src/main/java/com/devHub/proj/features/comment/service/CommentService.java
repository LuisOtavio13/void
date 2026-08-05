package com.devHub.proj.features.comment.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.devHub.proj.features.comment.dto.request.CreateCommentRequest;
import com.devHub.proj.global.dto.CommentDTO;
import com.devHub.proj.global.models.Comment;
import com.devHub.proj.global.models.Project;
import com.devHub.proj.global.models.User;
import com.devHub.proj.global.repository.CommentRepository;
import com.devHub.proj.global.repository.ProjectRepository;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentsRepo;
    private final ProjectRepository projectRepo;

    public CommentService(CommentRepository commentsRepo, ProjectRepository projectRepo) {
        this.commentsRepo = commentsRepo;
        this.projectRepo = projectRepo;
    }

    public CommentDTO createComment(CreateCommentRequest request, User user) {
        Project project = projectRepo.findById(request.projectId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
        Comment comment = new Comment();
        comment.setContent(request.content());
        comment.setUserId(user);
        comment.setProjectId(project);
        return toDTO(commentsRepo.save(comment));
    }

    public List<CommentDTO> getCommentsByProject(Long projectId) {
        return commentsRepo.findByProjectId_Id(projectId).stream().map(this::toDTO).toList();
    }

    public CommentDTO likeComment(Long commentId) {
        Comment comment = commentsRepo.findById(commentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found"));
        comment.setLikes(comment.getLikes() + 1);
        return toDTO(commentsRepo.save(comment));
    }

    public CommentDTO dislikeComment(Long commentId) {
        Comment comment = commentsRepo.findById(commentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found"));
        comment.setDislikes(comment.getDislikes() + 1);
        return toDTO(commentsRepo.save(comment));
    }

    public void deleteComment(Long commentId, User user) {
        Comment comment = commentsRepo.findById(commentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found"));
        if (comment.getUserId().getId() != user.getId()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own comments");
        }
        commentsRepo.delete(comment);
    }

    private CommentDTO toDTO(Comment c) {
        return new CommentDTO(
            c.getId(), c.getContent(), c.getUserId().getName(),
            c.getUserId().getId(), c.getUserId().getAvatar_url(),
            c.getLikes(), c.getDislikes(), c.getCreatedAt(), c.getUpdatedAt()
        );
    }
}
