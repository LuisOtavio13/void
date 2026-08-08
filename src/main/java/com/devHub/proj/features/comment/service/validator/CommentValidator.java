package com.devHub.proj.features.comment.service.validator;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import com.devHub.proj.global.models.Comment;
import com.devHub.proj.global.models.User;

@Component
public class CommentValidator {
    public void validateAuthorizationComment(User user, Comment comment){
        if(!user.getId().equals(comment.getUserId().getId()) && !user.getRole().equals("ADMIN")){
            throw new AccessDeniedException("You are not authorized to update this project.");
        }
    }
}
