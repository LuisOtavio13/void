package com.devHub.proj.features.post.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devHub.proj.features.like.dto.ReactionCountAndStatus;
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
import com.devHub.proj.global.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepo;
    private final ReactionService reactionService;
    private final UserRepository userRepository;
    private final TagService tagService;
    private final ProjectValidator validator;
    private final ProjectMapper projectMapper;

    public ProjectService(
            ProjectRepository projectRepo,
            TagService tagService,
            ReactionService reactionService,
            ProjectValidator validator,
            ProjectMapper projectMapper,
            UserRepository userRepository) {
        this.projectRepo = projectRepo;
        this.reactionService = reactionService;
        this.userRepository = userRepository;
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
    public ProjectsResponse createProject(CreatePostRequest projectRequest, User user) {

        validator.validate(projectRequest);
        List<Tag> tags = findOrCreateTags(projectRequest);

        Project project = projectMapper.toProject(projectRequest, tags, user);
        var emptyReaction = new ReactionCountAndStatus(0L, false,0L, false);

        projectRepo.save(project);
        log.info(
                "Project created: projectId={}, userId={}, tags={}, tagCount={}",
                project.getId(),
                user.getId(),
                tags.stream().map(t -> t.getName()).toList(),
                tags.size());
        return projectMapper.toProjectsResponse(emptyReaction, project, user);

    }

    public Page<ProjectsResponse> getAllProjects(User user, int page, int size) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("createdAt").descending());

        User viewer = user == null ? guestUser() : user;

        return projectRepo.findAll(pageable).map(project -> {
            var reaction = reactionService.getProjectReactionInfo(
                    project.getId(),
                    viewer.getId());

            return projectMapper.toProjectsResponse(
                    reaction,
                    project,
                    viewer);
        });
    }

    public ProjectsResponse getProjectDetails(Long id, User user) {
        Project project = getProjectById(id);
        User viewer = user == null ? guestUser() : user;

        return projectMapper.toProjectsResponse(
                reactionService.getProjectReactionInfo(project.getId(), viewer.getId()),
                project,
                viewer);
    }

    @Transactional
    public Project updateProject(Long id, CreatePostRequest projectRequest, User user) {

        validator.validate(projectRequest);

        Project existingProject = getProjectById(id);

        validator.validateAuthorizationProject(existingProject, user);

        List<Tag> tags = findOrCreateTags(projectRequest);

        projectMapper.updateProject(existingProject, projectRequest, tags);

        Project updatedProject = projectRepo.save(existingProject);

        log.info(
                "Project updated: projectId={}, userId={}, tags={}, tagCount={}",
                existingProject.getId(),
                user.getId(),
                tags.stream().map(t -> t.getName()).toList(),
                tags.size());

        return updatedProject;
    }

    @Transactional
    public void deleteProject(Long id, User user) {
        Project project = getProjectById(id);

        validator.validateAuthorizationProject(project, user);

        projectRepo.delete(project);
        log.info(
                "Project deleted: projectId={}, userId={}, title={}",
                project.getId(),
                user.getId(),
                project.getName());

    }

    @Transactional(readOnly = true)
    public List<ProjectsResponse> getProjectsByOwnerName(User owner,User currentUser) {
        User viewer = currentUser == null ? guestUser() : currentUser;
        List<Project> projects = projectRepo.findByOwner(owner);

        List<ProjectsResponse> projectsResponseList = new ArrayList<>();

        for (Project project : projects) {
            ReactionCountAndStatus reaction = reactionService.getProjectReactionInfo(
                    project.getId(),
                    viewer.getId()
            );

            ProjectsResponse response = projectMapper.toProjectsResponse(
                    reaction,
                    project,
                    viewer
            );

            projectsResponseList.add(response);
        }

        return projectsResponseList;
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
    public User getUserById(Long id){
        return userRepository.findById(id).orElse(null);
    }
    private List<Tag> findOrCreateTags(CreatePostRequest request) {
        log.debug("Finding or creating tags: tags={}",
                request.tags().stream()
                        .map(t -> t.name())
                        .toList());

        return request.tags()
                .stream()
                .map(t -> tagService.findByName(t.name())
                        .orElseGet(() -> {
                            log.debug("Tag not found, creating tag: name={}", t.name());
                            return tagService.newTag(t.name());
                        }))

                .toList();
    }
}
