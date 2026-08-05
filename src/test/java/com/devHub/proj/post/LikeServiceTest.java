package com.devHub.proj.post;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashSet;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.devHub.proj.features.like.service.LikeService;
import com.devHub.proj.global.exception.NotFoundException;
import com.devHub.proj.global.models.Like;
import com.devHub.proj.global.models.Project;
import com.devHub.proj.global.models.User;
import com.devHub.proj.global.repository.LikeRepository;
import com.devHub.proj.global.repository.ProjectRepository;

@ExtendWith(MockitoExtension.class)
class LikeServiceTest {

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private ProjectRepository projectRepo;

    @InjectMocks
    private LikeService likeService;

    private User user;
    private Project project;
    private Long postId;

    @BeforeEach
    void setUp() {
        postId = 1L;
        
        user = new User();
        user.setId(100L);

        project = new Project();
        project.setId(postId);
        project.setLikes(new HashSet<>()); 
    }

    
    @Test
    void likePost_Success() {
        
        when(projectRepo.findById(postId)).thenReturn(Optional.of(project));

        
        likeService.updateReaction(postId, user, true);

       
        verify(likeRepository).save(any(Like.class));
        verify(projectRepo).save(project);
    }
    @Test
    void likePost_PostNotFound() {
        
        when(projectRepo.findById(postId)).thenReturn(Optional.empty());

        
        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            likeService.updateReaction(postId, user, true);
        });

        assertEquals("Not found: Post not found", exception.getMessage());
        verify(likeRepository, never()).save(any(Like.class));
    }
    @Test
    void likePost_UserAlreadyLiked() {
        
        Like existingLike = new Like(true, user, project);
        project.getLikes().add(existingLike); 

        when(projectRepo.findById(postId)).thenReturn(Optional.of(project));

        
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            likeService.updateReaction(postId, user, true);
        });

        assertEquals("User has already liked this post", exception.getMessage());
        verify(likeRepository, never()).save(any(Like.class));
    }

    @Test
    void unlikePost_Success() {
        
        Like existingLike = new Like(true, user, project);
        project.getLikes().add(existingLike); 
        when(projectRepo.findById(postId)).thenReturn(Optional.of(project));

        
        likeService.updateReaction(postId, user, false);

        
        verify(likeRepository).delete(existingLike);
        verify(projectRepo).save(project);
    }
    @Test
    void unlikePost_PostNotFound() {
        
        when(projectRepo.findById(postId)).thenReturn(Optional.empty());

        
        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            likeService.updateReaction(postId, user, false);
        });

        assertEquals("Not found: Post not found", exception.getMessage());
        verify(likeRepository, never()).delete(any(Like.class));
    }

    @Test
    void unlikePost_UserHadNotLiked() {
        when(projectRepo.findById(postId)).thenReturn(Optional.of(project));

        
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            likeService.updateReaction(postId, user, false);
        });

        assertEquals("User has not liked this post", exception.getMessage());
        verify(likeRepository, never()).delete(any(Like.class));
    }
}
