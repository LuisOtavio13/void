package com.devHub.proj.post.service.validator;



import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import com.devHub.proj.models.Project;
import com.devHub.proj.models.User;
import com.devHub.proj.post.dto.request.CreatePostRequest;
import com.devHub.proj.post.dto.request.TagRequest;
import com.devHub.proj.post.exception.PostLenException;

@Component
public class ProjectValidator {
    public void validate(CreatePostRequest createPostRequest){
        validateName(createPostRequest.name());
        validateDescription(createPostRequest.description());
        validadeTags(createPostRequest.tags());

    }
    public void validateAuthorizationProject(Project project, User user){
        if(!project.getOwner().getId().equals(user.getId())){
            throw new AccessDeniedException("You are not authorized to update this project.");
        }
    }
    private void validateName(String name){
        if (name.length() < 1 || name.length() > 100) {
            throw new PostLenException("name", 1, 100);
        }
    }
    private void validateDescription(String description){
        if (description.length() < 1 ||
                description.length() > 5000) {
            throw new PostLenException("description", 1, 5000);
        }
    }
    private void validadeTags(List<TagRequest> tags){
       if (tags.size() < 1 || tags.size() > 10) {
            throw new PostLenException("tags", 1, 10);
        }
    }
}
