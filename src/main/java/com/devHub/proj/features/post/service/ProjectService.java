package com.devHub.proj.features.post.service;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devHub.proj.features.like.service.ReactionService;
import com.devHub.proj.features.post.dto.request.CreatePostRequest;
import com.devHub.proj.features.post.dto.response.ProjectsResponse;
import com.devHub.proj.features.post.service.mapper.ProjectMapper;
import com.devHub.proj.features.post.service.validator.ProjectValidator;
import com.devHub.proj.global.exception.NotFoundException;
import com.devHub.proj.global.models.Project;
import com.devHub.proj.global.models.Tag;
import com.devHub.proj.global.models.User;
import com.devHub.proj.global.repository.ProjectRepository;


@Service
public class ProjectService {

    private final ProjectRepository projectRepo;
    private final ReactionService reactionService;
    private final TagService tagService;
    private final ProjectValidator validator;
    private final ProjectMapper projectMapper;

    public ProjectService(
            ProjectRepository projectRepo,
            TagService tagService,
            ReactionService reactionService,
            ProjectValidator validator,
            ProjectMapper projectMapper) {
        this.projectRepo = projectRepo;
        this.reactionService = reactionService;
        this.tagService = tagService;
        this.validator = validator;
        this.projectMapper = projectMapper;
    }

    public Project getProjectById(Long id) {
        return projectRepo
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Project with id = " + id));
    }

    @Transactional
    public void createProject(CreatePostRequest projectRequest, User user) {
        validator.validate(projectRequest);
        List<Tag> tags = findOrCreateTags(projectRequest);

        Project project = projectMapper.toProject(projectRequest, tags, user);

        projectRepo.save(project);
    }

    public Page<ProjectsResponse> getAllProjects(User user, int page, int size) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("createdAt").descending());

        return projectRepo.findAll(pageable).map(project -> {
            var reaction = reactionService.getReactionInfo(
                    project.getId(),
                    user.getId());

            return projectMapper.toProjectsResponse(
                    reaction,
                    project,
                    user);
        });
    }

    public ProjectsResponse getProjectDetails(Long id, User user){
       Project project = getProjectById(id);

        return projectMapper.toProjectsResponse(
            reactionService.getReactionInfo(project.getId(), user.getId()),
            project,
            user
        );
    }

    @Transactional
    public Project updateProject(Long id, CreatePostRequest projectRequest, User user){
        
        validator.validate(projectRequest);

        Project existingProject = getProjectById(id);

        validator.validateAuthorizationProject(existingProject, user);

        List<Tag> tags = findOrCreateTags(projectRequest);

        projectMapper.updateProject(existingProject, projectRequest, tags);

        return projectRepo.save(existingProject);
    }
    
   
    @Transactional
    public void deleteProject(Long id, User user) {
        Project project = getProjectById(id);

        validator.validateAuthorizationProject(project, user);

        projectRepo.delete(project);
    }

    private List<Tag> findOrCreateTags(CreatePostRequest request) {
        return request.tags()
                .stream()
                .map(t -> tagService.findByName(t.name())
                        .orElseGet(() -> tagService.newTag(t.name())))
                .toList();
    }
}
