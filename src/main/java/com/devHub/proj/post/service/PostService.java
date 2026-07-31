package com.devHub.proj.post.service;

import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.devHub.proj.models.Project;
import com.devHub.proj.models.Tag;
import com.devHub.proj.models.User;
import com.devHub.proj.post.dto.request.CreatePostRequest;
import com.devHub.proj.post.dto.response.ProjectsResponse;
import com.devHub.proj.post.dto.response.UserResponse;
import com.devHub.proj.post.exception.NotFoundException;
import com.devHub.proj.post.exception.PostLenException;
import com.devHub.proj.repository.ProjectRepo;
import com.devHub.proj.repository.TagRepo;

@Service
public class PostService {

    private final ProjectRepo projectRepo;
    private final TagRepo tagRepository;

    public PostService(
        ProjectRepo projectRepo,
        TagRepo tagRepository
    ) {
        this.projectRepo = projectRepo;
        this.tagRepository = tagRepository;
    }

    public void createPost(CreatePostRequest post, User user)
        throws RuntimeException {
        validatePost(post);
        List<Tag> tags = post
            .tags()
            .stream()
            .map(t ->
                tagRepository
                    .findByName(t.name())
                    .orElseGet(() -> tagRepository.save(new Tag(t.name())))
            )
            .toList();

        Project pojeto = new Project(
            post.name(),
            post.LinkGithub(),
            post.linkProjeto(),
            post.description(),
            0,
            LocalDateTime.now(),
            LocalDateTime.now(),
            tags,
            user
        );

        projectRepo.save(pojeto);
    }

    public Page<ProjectsResponse> getAllPosts(User user, int page, int size) {
        Pageable pageable = PageRequest.of(
            page,
            size,
            Sort.by("createdAt").descending()
        );

        return projectRepo.findAll(pageable).map(project -> {
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
                    project.getOwner().getCreated_at()
                ),
                project.getGithub_url(),
                project.getLink_url(),
                project.getOwner().getId().equals(user.getId()),
                project.getCreatedAt(),
                project.getUpdatedAt()
            );
        });
    }

    private void validatePost(CreatePostRequest post) throws RuntimeException {
        if (post.name().length() < 1 || post.name().length() > 100) {
            throw new PostLenException("name", 1, 100);
        }
        if (
            post.description().length() < 1 ||
            post.description().length() > 5000
        ) {
            throw new PostLenException("description", 1, 5000);
        }
        if (post.tags().size() < 1 || post.tags().size() > 10) {
            throw new PostLenException("tags", 1, 10);
        }
    }

    public void deletePost(Long id) {
        try {
            projectRepo.deleteById(id);
        } catch (EntityNotFoundException e) {
            throw new NotFoundException("Project with id = " + id);
        }
    }

    public Project getPostById(Long id) {
        return projectRepo
            .findById(id)
            .orElseThrow(() ->
                new NotFoundException("Project with id = " + id)
            );
    }
}
