package com.devHub.proj.like.service;

import org.springframework.stereotype.Service;

import com.devHub.proj.models.Like;
import com.devHub.proj.models.Project;
import com.devHub.proj.models.User;
import com.devHub.proj.post.service.ProjectService;
import com.devHub.proj.repository.LikeRepository;



/**
 * This class represents services of like
 */
@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final ProjectService projectService;

    public LikeService(LikeRepository likeRepository, ProjectService projectService) {
        this.likeRepository = likeRepository;
        this.projectService = projectService;
    }


    
    /**
     * Adds, updates or removes the user's reaction to a project.
     * @param postId
     * @param user
     * @param liked
     */
    public void updateReaction(Long postId, User user, boolean liked) {
        Like reaction = findUserReaction(user, postId);

        if (reaction == null) {

            createReaction(user, postId, liked);

        } else if (reaction.getLiked() != liked) {

            saveReaction(reaction, liked);

        } else {

            removeReaction(reaction);
        }
    }

    private void removeReaction(Like reaction) {
        likeRepository.delete(reaction);
    }

    private void saveReaction(Like reaction, boolean liked) {
        reaction.setLike(liked);
        likeRepository.save(reaction);
    }

    private void createReaction(User user, Long postId, boolean liked) {
        Project project = projectService.findProject(postId);

        Like reaction = new Like(liked, user, project);

        likeRepository.save(reaction);
    }

    private Like findUserReaction(User user, Long postId) {
        return likeRepository
                .findByUserIdAndProjectId(user.getId(), postId)
                .orElse(null);
    }
}
