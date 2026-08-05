package com.devHub.proj.features.like.service;

import org.springframework.stereotype.Service;

import com.devHub.proj.features.like.dto.ReactionCountAndStatus;
import com.devHub.proj.features.like.service.LikeService.ReactionStatus;
import com.devHub.proj.global.models.Like;
import com.devHub.proj.global.models.User;
import com.devHub.proj.global.repository.LikeRepository;

@Service
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
