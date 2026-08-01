package com.devHub.proj.post;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.devHub.proj.models.Like;
import com.devHub.proj.models.Project;
import com.devHub.proj.models.User;
import com.devHub.proj.post.exception.NotFoundException;
import com.devHub.proj.post.service.LikeService;
import com.devHub.proj.repository.LikeRepository;
import com.devHub.proj.repository.ProjectRepo;

@ExtendWith(MockitoExtension.class)
class LikeServiceTest {

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private ProjectRepo projectRepo;

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

        
        likeService.likePost(postId, user);

       
        verify(likeRepository).save(any(Like.class));
        verify(projectRepo).save(project);
    }
    @Test
    void likePost_PostNotFound() {
        
        when(projectRepo.findById(postId)).thenReturn(Optional.empty());

        
        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            likeService.likePost(postId, user);
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
            likeService.likePost(postId, user);
        });

        assertEquals("User has already liked this post", exception.getMessage());
        verify(likeRepository, never()).save(any(Like.class));
    }

    @Test
    void unlikePost_Success() {
        
        Like existingLike = new Like(true, user, project);
        project.getLikes().add(existingLike); 
        when(projectRepo.findById(postId)).thenReturn(Optional.of(project));

        
        likeService.unlikePost(postId, user);

        
        verify(likeRepository).delete(existingLike);
        verify(projectRepo).save(project);
    }
    @Test
    void unlikePost_PostNotFound() {
        
        when(projectRepo.findById(postId)).thenReturn(Optional.empty());

        
        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            likeService.unlikePost(postId, user);
        });

        assertEquals("Not found: Post not found", exception.getMessage());
        verify(likeRepository, never()).delete(any(Like.class));
    }

    @Test
    void unlikePost_UserHadNotLiked() {
        when(projectRepo.findById(postId)).thenReturn(Optional.of(project));

        
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            likeService.unlikePost(postId, user);
        });

        assertEquals("User has not liked this post", exception.getMessage());
        verify(likeRepository, never()).delete(any(Like.class));
    }
}
