package com.devHub.proj.features.like.service;

import org.springframework.stereotype.Service;

import com.devHub.proj.features.comment.service.CommentService;
import com.devHub.proj.features.post.service.ProjectService;
import com.devHub.proj.global.models.Comment;
import com.devHub.proj.global.models.Like;
import com.devHub.proj.global.models.Project;
import com.devHub.proj.global.models.User;

/**
 * This class represents services of like
 */
@Service
public class LikeService {

    private final ProjectService projectService;
    private final ReactionService reactionService;
    private final CommentService commentService;

    public LikeService(ProjectService projectService, ReactionService reactionService, CommentService commentService) {
        this.reactionService = reactionService;
        this.commentService = commentService;
        this.projectService = projectService;
    }

    /**
     * ReactionStatus
     */
    public record ReactionStatus(boolean like, boolean deslike) {
    }

    /**
     * Adds, updates or removes the user's reaction to a project.
     * 
     * @param postId
     * @param user
     * @param liked
     */
    public void updateReactionProject(Long postId, User user, boolean liked) {
        Like reaction = reactionService.findUserProjectReaction(user, postId);

        if (reaction == null) {

            createReactionProject(user, postId, liked);

        } else if (reaction.getLiked() != liked) {

            reactionService.saveReaction(reaction, liked);

        } else {

            reactionService.removeReaction(reaction);
        }
    }

    public void updateReactionComment(Long commentID, User user, boolean liked) {
        Like reaction = reactionService.findUserCommentReaction(user, commentID);

        if (reaction == null) {

            createReactionComment(user, commentID, liked);

        } else if (reaction.getLiked() != liked) {

            reactionService.saveReaction(reaction, liked);

        } else {

            reactionService.removeReaction(reaction);
        }
    }

    

    private void createReactionProject(User user, Long postId, boolean liked) {
        Project project = projectService.getProjectById(postId);

        Like reaction = new Like(liked, user, project);

        reactionService.saveReaction(reaction);
    }
      private void createReactionComment(User user, Long commentID, boolean liked) {
        Comment comment = commentService.getCommentById(commentID);

        Like reaction = new Like(liked, user, comment);

        reactionService.saveReaction(reaction);
    }

    
}
