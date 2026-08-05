package com.devHub.proj.like.service;

import com.devHub.proj.like.dto.ReactionCountAndStatus;
import com.devHub.proj.like.service.LikeService.ReactionStatus;
import com.devHub.proj.models.Like;
import com.devHub.proj.models.User;
import com.devHub.proj.repository.LikeRepository;

public class ReactionService {
    private final LikeRepository likeRepository;

    public ReactionService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public ReactionCountAndStatus getReactionInfo(Long projectId, Long userId) {
        long likes = likeRepository.countByProjectIdAndLiked(projectId, true);
        long dislikes = likeRepository.countByProjectIdAndLiked(projectId, false);

        ReactionStatus reactionStatus = getUserReaction(projectId, userId);

        return new ReactionCountAndStatus(likes, reactionStatus.like(), dislikes, reactionStatus.deslike());
    }

    private ReactionStatus getUserReaction(Long projectId, Long userId) {
        return likeRepository
                .findByUserIdAndProjectId(userId, projectId)
                .map(like -> new ReactionStatus(
                        like.getLiked(),
                        !like.getLiked()))
                .orElse(new ReactionStatus(false, false));
    }

    public void removeReaction(Like reaction) {
        likeRepository.delete(reaction);
    }

    public void saveReaction(Like reaction, boolean liked) {
        reaction.setLike(liked);
        likeRepository.save(reaction);
    }

    public void saveReaction(Like reaction) {
        likeRepository.save(reaction);
    }

    public Like findUserReaction(User user, Long postId) {
        return likeRepository
                .findByUserIdAndProjectId(user.getId(), postId)
                .orElse(null);
    }

}
