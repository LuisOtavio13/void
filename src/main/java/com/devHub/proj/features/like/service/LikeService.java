package com.devHub.proj.features.like.service;

import org.springframework.stereotype.Service;

import com.devHub.proj.features.post.service.ProjectService;
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

    public LikeService(ProjectService projectService, ReactionService reactionService) {
        this.reactionService = reactionService;
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
    public void updateReaction(Long postId, User user, boolean liked) {
        Like reaction = reactionService.findUserReaction(user, postId);

        if (reaction == null) {

            createReaction(user, postId, liked);

        } else if (reaction.getLiked() != liked) {

            reactionService.saveReaction(reaction, liked);

        } else {

            reactionService.removeReaction(reaction);
        }
    }

    

    

    private void createReaction(User user, Long postId, boolean liked) {
        Project project = projectService.getProjectById(postId);

        Like reaction = new Like(liked, user, project);

        reactionService.saveReaction(reaction);
    }

    
}
