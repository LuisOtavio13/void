package com.devHub.proj.features.comment.service;

import org.springframework.stereotype.Service;

import com.devHub.proj.features.comment.dto.request.CreateCommentRequest;
import com.devHub.proj.features.comment.service.mapper.CommentMapper;
import com.devHub.proj.features.comment.service.validator.CommentValidator;
import com.devHub.proj.features.event.service.EventType;
import com.devHub.proj.features.event.service.SseEventService;
import com.devHub.proj.features.like.dto.ReactionCountAndStatus;
import com.devHub.proj.features.like.service.ReactionService;
import com.devHub.proj.features.post.service.ProjectService;
import com.devHub.proj.global.dto.CommentDTO;
import com.devHub.proj.global.exception.NotFoundException;
import com.devHub.proj.global.models.Comment;
import com.devHub.proj.global.models.Project;
import com.devHub.proj.global.models.User;
import com.devHub.proj.global.repository.CommentRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j 
public class CommentService {

        private final ReactionService reactionService;
        private final CommentMapper commentMapper;
        private final CommentRepository commentRepository;
        private final ProjectService projectService;
        private final CommentValidator commentValidator;
        private final SseEventService sseEventService;

        public CommentService(ReactionService reactionService,
                        ProjectService projectService,
                        CommentMapper commentMapper,
                        CommentRepository commentRepository,
                        CommentValidator commentValidator,
                        SseEventService sseEventService) {
                this.reactionService = reactionService;
                this.commentRepository = commentRepository;
                this.commentMapper = commentMapper;
                this.projectService = projectService;
                this.commentValidator = commentValidator;
                this.sseEventService = sseEventService;
        }

        public CommentDTO createComment(CreateCommentRequest request, User user) {
                Project project = projectService.getProjectById(request.projectId());

                Comment parent = null;

                if (request.parentCommentId() != null) {
                        parent = getCommentById(request.parentCommentId());

                        if (!parent.getProjectId().getId().equals(project.getId())) {

                                throw new IllegalArgumentException(
                                                "Parent comment belongs to another project");

                        }
                }

                Comment comment = commentMapper.newComment(user, project, request.content());

                comment.setParentComment(parent);

                commentRepository.save(comment);

                ReactionCountAndStatus reactionCountAndStatus = reactionService.getCommentReactionInfo(comment.getId(),
                                user.getId());
                
                CommentDTO out = commentMapper.toDto(comment, user, reactionCountAndStatus);
                sseEventService.sendEvent(EventType.COMMENT_CREATED, out);
                return out;
        }

        public List<CommentDTO> getCommentsByProject(
                        Long projectId,
                        User user) {

                List<Comment> comments = commentRepository
                                .findByProjectId_Id(projectId);

                if (comments.isEmpty()) {
                        return List.of();
                }

                List<Comment> roots = comments.stream()
                                .filter(comment -> comment.getParentComment() == null)
                                .toList();

                Map<Long, List<Comment>> childrenByParent = comments.stream()
                                .filter(comment -> comment.getParentComment() != null)
                                .collect(Collectors.groupingBy(
                                                comment -> comment.getParentComment().getId()));

                return roots.stream()
                                .map(root -> buildCommentDTO(
                                                root,
                                                childrenByParent,
                                                user))
                                .toList();
        }

        public Comment getCommentById(Long id) {
                return commentRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("Comment not found"));
        }

        public void deleteComment(Long commentId, User user) {
                Comment comment = getCommentById(commentId);

                commentValidator.validateAuthorizationComment(user, comment);

                commentRepository.delete(comment);
        }

        private int countDescendants(
                        Long commentId,
                        Map<Long, List<Comment>> childrenByParent) {

                List<Comment> children = childrenByParent
                                .getOrDefault(commentId, List.of());

                int count = children.size();

                for (Comment child : children) {
                        count += countDescendants(
                                        child.getId(),
                                        childrenByParent);
                }

                return count;
        }
        public CommentDTO updateComment(Long commentId, CreateCommentRequest request, User user) {
                Comment comment = getCommentById(commentId);

                commentValidator.validateAuthorizationComment(user, comment);

                comment.setContent(request.content());

                Comment updatedComment = commentRepository.save(comment);

                ReactionCountAndStatus reactionCountAndStatus = reactionService.getCommentReactionInfo(
                                updatedComment.getId(),
                                user.getId());

                log.info("Comment updated: commentId={}, userId={}, content={}",
                                updatedComment.getId(),
                                user.getId(),
                                updatedComment.getContent());
                return commentMapper.toDto(updatedComment, user, reactionCountAndStatus);
        }

        private CommentDTO buildCommentDTO(
                        Comment comment,
                        Map<Long, List<Comment>> childrenByParent,
                        User user) {

                ReactionCountAndStatus reaction = reactionService.getCommentReactionInfo(
                                comment.getId(),
                                user.getId());

                List<CommentDTO> replies = childrenByParent
                                .getOrDefault(comment.getId(), List.of())
                                .stream()
                                .map(child -> buildCommentDTO(
                                                child,
                                                childrenByParent,
                                                user))
                                .toList();

                int nestedRepliesCount = countDescendants(
                                comment.getId(),
                                childrenByParent);

                return commentMapper.toDto(
                                comment,
                                comment.getUserId(),
                                reaction,
                                replies,
                                nestedRepliesCount);
        }
}
