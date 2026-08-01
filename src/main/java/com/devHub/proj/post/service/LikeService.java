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
        Project project = projectRepo.findById(postId).orElseThrow(() -> new NotFoundException("Post not found"));
        for(var like : project.getLikes()) {
            if(like.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("User has already liked this post");
            }
        }
        Like like = new Like(true, user, project);
        likeRepository.save(like);
        project.addLike(like);
        projectRepo.save(project);
    }
    public void unlikePost(Long postId, User user) throws RuntimeException {
        Project project = projectRepo.findById(postId).orElseThrow(() -> new NotFoundException("Post not found"));
        Like likeToRemove = null;
        for(var like : project.getLikes()) {
            if(like.getUser().getId().equals(user.getId())) {
                likeToRemove = like;
                break;
            }
        }
        if(likeToRemove == null) {
            throw new RuntimeException("User has not liked this post");
        }
        project.removeLike(likeToRemove);
        likeRepository.delete(likeToRemove);
        projectRepo.save(project);
    }
}
