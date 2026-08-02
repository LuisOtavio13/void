package com.devHub.proj.post.service;

import org.springframework.stereotype.Service;

import com.devHub.proj.models.Like;
import com.devHub.proj.models.Project;
import com.devHub.proj.models.User;
import com.devHub.proj.post.exception.NotFoundException;
import com.devHub.proj.repository.LikeRepository;
import com.devHub.proj.repository.ProjectRepo;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final ProjectRepo projectRepo;

    public LikeService(LikeRepository likeRepository, ProjectRepo projectRepo) {
        this.likeRepository = likeRepository;
        this.projectRepo = projectRepo;
    }

    public void likePost(Long postId, User user) throws RuntimeException {
        Like reaction = likeRepository
                .findByUserIdAndProjectId(user.getId(), postId)
                .orElse(null);

        if (reaction == null) {
            Like like =new Like(true, user, projectRepo.findById(postId).orElse(null));
            if(like.getProject() == null){
                throw new NotFoundException("Not exisits project");
            }
            likeRepository.save(like);
        } else if (reaction.getLiked()) {
            reaction.setLike(true);
            likeRepository.save(reaction);
        } else {
            likeRepository.delete(reaction);
        }
    }

    public void unlikePost(Long postId, User user) throws RuntimeException {
        Like reaction = likeRepository
                .findByUserIdAndProjectId(user.getId(), postId)
                .orElse(null);

        if (reaction == null) {
            Like like =new Like(false, user, projectRepo.findById(postId).orElse(null));
            if(like.getProject() == null){
                throw new NotFoundException("Not exisits project");
            }
            likeRepository.save(like);
        } else if (reaction.getLiked()) {
            reaction.setLike(false);
            likeRepository.save(reaction);
        } else {
            likeRepository.delete(reaction);
        }
    }
}
