package com.devHub.proj.features.comment.service.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.devHub.proj.features.like.dto.ReactionCountAndStatus;
import com.devHub.proj.features.post.dto.response.UserResponse;
import com.devHub.proj.global.dto.CommentDTO;
import com.devHub.proj.global.models.Comment;
import com.devHub.proj.global.models.Project;
import com.devHub.proj.global.models.User;

@Component
public class CommentMapper {
        public Comment newComment(User user, Project project, String content) {
                Comment comment = new Comment();
                comment.setContent(content);
                comment.setUserId(user);
                comment.setProjectId(project);
                return comment;
        }

        public CommentDTO toDto(
                        Comment comment,
                        User user,
                        ReactionCountAndStatus reaction) {

                return toDto(
                                comment,
                                user,
                                reaction,
                                List.of(),
                                0);
        }

        public CommentDTO toDto(Comment comment, User user,
                        ReactionCountAndStatus reaction,
                        List<CommentDTO> replies,
                        int nestedRepliesCount) {
                User viewer = user == null ? guestUser() : user;
                return new CommentDTO(comment.getId(),
                                new UserResponse(
                                                viewer.getName(),
                                                viewer.getId(),
                                                viewer.getAvatar_url(),
                                                viewer.getBio(),
                                                false,
                                                viewer.getRole().equals("ADMIN"),
                                                viewer.getCreated_at()),
                                comment.getContent(),
                                reaction.likesCount(),
                                reaction.desLikesCount(),
                                reaction.isLikedByUser(),
                                reaction.isDesLikedByUser(),
                                comment.getUserId().getId().equals(viewer.getId()),
                                comment.getCreatedAt(),
                                comment.getUpdatedAt(),
                                replies,
                                Long.valueOf(nestedRepliesCount),
                                comment.getParentComment() != null
                                                ? comment.getParentComment().getId()
                                                : null

                );
        }

        private User guestUser() {
                User guest = new User();
                guest.setId(0L);
                guest.setName("Visitante");
                guest.setRole("USER");
                guest.setAvatar_url("");
                guest.setBio("");
                guest.setEmail("guest@devhub.local");
                guest.setPassword("");
                guest.setCreated_at(java.time.LocalDateTime.now());
                guest.setUpdated_at(java.time.LocalDateTime.now());
                guest.setBannerURL("");
                return guest;
        }
}
