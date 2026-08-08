package com.devHub.proj.features.comment.service;


import org.springframework.stereotype.Service;

import com.devHub.proj.features.comment.dto.request.CreateCommentRequest;
import com.devHub.proj.features.comment.service.mapper.CommentMapper;
import com.devHub.proj.features.comment.service.validator.CommentValidator;
import com.devHub.proj.features.like.dto.ReactionCountAndStatus;
import com.devHub.proj.features.like.service.ReactionService;
import com.devHub.proj.features.post.service.ProjectService;
import com.devHub.proj.global.dto.CommentDTO;
import com.devHub.proj.global.exception.NotFoundException;
import com.devHub.proj.global.models.Comment;
import com.devHub.proj.global.models.Project;
import com.devHub.proj.global.models.User;
import com.devHub.proj.global.repository.CommentRepository;

import java.util.List;

@Service
public class CommentService {

    private final ReactionService reactionService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final ProjectService projectService;
    private final CommentValidator commentValidator;

    public CommentService(ReactionService reactionService, 
        ProjectService projectService,
        CommentMapper commentMapper,
        CommentRepository commentRepository,
        CommentValidator commentValidator
    ) {
        this.reactionService = reactionService;
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.projectService = projectService;
        this.commentValidator = commentValidator;
    }

    public CommentDTO createComment(CreateCommentRequest request, User user) {
        Project project = projectService.getProjectById(request.projectId());

        Comment comment = commentMapper.newComment(user, project, request.content());

        commentRepository.save(comment);

        ReactionCountAndStatus reactionCountAndStatus = reactionService.getCommentReactionInfo(comment.getId(), user.getId());
        
        return commentMapper.toDto(comment, user, reactionCountAndStatus);
    }

    public List<CommentDTO> getCommentsByProject(
        Long projectId,
        User user) {

    return commentRepository
            .findByProjectId_Id(projectId)
            .stream()
            .map(comment -> {

                ReactionCountAndStatus reaction =
                        reactionService.getCommentReactionInfo(
                                comment.getId(),
                                user.getId());

                return commentMapper.toDto(
                        comment,
                        comment.getUserId(),
                        reaction);
            })
            .toList();
}

    public Comment getCommentById(Long id){
            return commentRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Comment not found"));
    }

    public void deleteComment(Long commentId, User user) {
        Comment comment = getCommentById(commentId);
    
        commentValidator.validateAuthorizationComment(user, comment);

        commentRepository.delete(comment);
    }

   
}
