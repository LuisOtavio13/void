package com.devHub.proj.post;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashSet;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.devHub.proj.features.like.service.LikeService;
import com.devHub.proj.features.like.service.ReactionService;
import com.devHub.proj.features.post.service.ProjectService;
import com.devHub.proj.global.models.Like;
import com.devHub.proj.global.models.Project;
import com.devHub.proj.global.models.User;
import com.devHub.proj.global.repository.LikeRepository;
import com.devHub.proj.global.repository.ProjectRepository;

@ExtendWith(MockitoExtension.class)
class LikeServiceTest {

    @Mock
    private ReactionService reactionService;

    @Mock
    private ProjectService projectService;

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

        when(reactionService.findUserReaction(user, postId))
                .thenReturn(null);

        when(projectService.getProjectById(postId))
                .thenReturn(project);

        likeService.updateReaction(postId, user, true);

        verify(reactionService).saveReaction(any(Like.class));
    }

    @Test
    void likePost_UserAlreadyLiked() {

        Like existingLike = new Like(true, user, project);

        when(reactionService.findUserReaction(user, postId))
                .thenReturn(existingLike);

        likeService.updateReaction(postId, user, true);

        verify(reactionService).removeReaction(existingLike);
    }

    @Test
    void unlikePost_Success() {

        Like existingLike = new Like(true, user, project);

        when(reactionService.findUserReaction(user, postId))
                .thenReturn(existingLike);

        likeService.updateReaction(postId, user, false);

        verify(reactionService).saveReaction(existingLike, false);
    }

    @Test
    void unlikePost_PostNotFound() {

        when(projectService.getProjectById(postId)).thenReturn(null);

        likeService.updateReaction(postId, user, false);

        verify(reactionService, never()).removeReaction(any(Like.class));
    }

    @Test
    void unlikePost_UserHadNotLiked() {
        when(projectService.getProjectById(postId)).thenReturn(project);

        likeService.updateReaction(postId, user, false);

        verify(reactionService, never()).removeReaction(any(Like.class));
    }
}
