package com.devHub.proj.features.post.service.mapper;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Component;

import com.devHub.proj.features.like.dto.ReactionCountAndStatus;
import com.devHub.proj.features.post.dto.request.CreatePostRequest;
import com.devHub.proj.features.post.dto.response.ProjectsResponse;
import com.devHub.proj.features.post.dto.response.UserResponse;
import com.devHub.proj.global.models.Like;
import com.devHub.proj.global.models.Project;
import com.devHub.proj.global.models.Tag;
import com.devHub.proj.global.models.User;

@Component
public class ProjectMapper {
        public Project toProject(CreatePostRequest postRequest, List<Tag> tags, User user) {
                return new Project(
                                postRequest.name(),
                                postRequest.LinkGithub(),
                                postRequest.linkProjeto(),
                                postRequest.description(),
                                new HashSet<Like>(),
                                LocalDateTime.now(),
                                LocalDateTime.now(),
                                tags,
                                user);
        }

        public ProjectsResponse toProjectsResponse(ReactionCountAndStatus reactionCount, Project project,
                        User user) {
                return new ProjectsResponse(
                                project.getName(),
                                project.getId(),
                                project.getDescription(),
                                project.getTags().stream().map(tag -> tag.getName()).toList(),
                                new UserResponse(
                                                project.getOwner().getName(),
                                                project.getOwner().getId(),
                                                project.getOwner().getAvatar_url(),
                                                project.getOwner().getBio(),
                                                false,
                                                project.getOwner().getRole().equals("ADMIN"),
                                                project.getOwner().getCreated_at()),
                                project.getGithub_url(),
                                project.getLink_url(),
                                reactionCount.likes(),
                                reactionCount.deslikes(),
                                reactionCount.like(),
                                reactionCount.deslike(),
                                project.getOwner().getId().equals(user.getId()),
                                project.getCreatedAt(),
                                project.getUpdatedAt());
        }

        public void updateProject(
                        Project project,
                        CreatePostRequest postRequest,
                        List<Tag> tags) {
                project.setName(postRequest.name());
                project.setDescription(postRequest.description());
                project.setGithub_url(postRequest.LinkGithub());
                project.setLink_url(postRequest.linkProjeto());
                project.setTags(tags);
                project.setUpdatedAt(LocalDateTime.now());
        }

}
