package com.devHub.proj.features.comment.service.mapper;

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

    public CommentDTO toDto(Comment comment, User user,
            ReactionCountAndStatus reaction) {
        return new CommentDTO(comment.getId(),
                new UserResponse(
                        user.getName(),
                        user.getId(),
                        user.getAvatar_url(),
                        user.getBio(),
                        false,
                        user.getRole().equals("ADMIN"),
                        user.getCreated_at()),
                comment.getContent(),
                reaction.likes(),
                reaction.deslikes(),
                reaction.like(),
                reaction.deslike(),
                comment.getUserId().getId().equals(user.getId()),
                comment.getCreatedAt(),
                comment.getUpdatedAt());
    }
}
