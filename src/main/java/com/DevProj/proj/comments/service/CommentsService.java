package com.DevProj.proj.comments.service;

import com.DevProj.proj.comments.dto.request.CreateCommentRequest;
import com.DevProj.proj.dtosGlobal.CommentsDTO;
import com.DevProj.proj.models.Comments;
import com.DevProj.proj.models.Projects;
import com.DevProj.proj.models.Users;
import com.DevProj.proj.repository.CommentsRepo;
import com.DevProj.proj.repository.ProjectRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class CommentsService {

    private final CommentsRepo commentsRepo;
    private final ProjectRepo projectRepo;

    public CommentsService(CommentsRepo commentsRepo, ProjectRepo projectRepo) {
        this.commentsRepo = commentsRepo;
        this.projectRepo = projectRepo;
    }

    public CommentsDTO createComment(CreateCommentRequest request, Users user) {
        Projects project = projectRepo.findById(request.projectId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
        Comments comment = new Comments();
        comment.setContent(request.content());
        comment.setUserId(user);
        comment.setProjectId(project);
        return toDTO(commentsRepo.save(comment));
    }

    public List<CommentsDTO> getCommentsByProject(Long projectId) {
        return commentsRepo.findByProjectId_Id(projectId).stream().map(this::toDTO).toList();
    }

    public CommentsDTO likeComment(Long commentId) {
        Comments comment = commentsRepo.findById(commentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found"));
        comment.setLikes(comment.getLikes() + 1);
        return toDTO(commentsRepo.save(comment));
    }

    public CommentsDTO dislikeComment(Long commentId) {
        Comments comment = commentsRepo.findById(commentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found"));
        comment.setDislikes(comment.getDislikes() + 1);
        return toDTO(commentsRepo.save(comment));
    }

    public void deleteComment(Long commentId, Users user) {
        Comments comment = commentsRepo.findById(commentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found"));
        if (comment.getUserId().getId() != user.getId()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own comments");
        }
        commentsRepo.delete(comment);
    }

    private CommentsDTO toDTO(Comments c) {
        return new CommentsDTO(
            c.getId(), c.getContent(), c.getUserId().getName(),
            c.getUserId().getId(), c.getUserId().getAvatar_url(),
            c.getLikes(), c.getDislikes(), c.getCreatedAt(), c.getUpdatedAt()
        );
    }
}
