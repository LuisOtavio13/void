package com.devHub.proj.post;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.data.domain.*;

import com.devHub.proj.features.like.dto.ReactionCountAndStatus;
import com.devHub.proj.features.like.service.ReactionService;
import com.devHub.proj.features.post.dto.request.CreatePostRequest;
import com.devHub.proj.features.post.dto.request.TagRequest;
import com.devHub.proj.features.post.dto.response.ProjectsResponse;
import com.devHub.proj.features.post.service.ProjectService;
import com.devHub.proj.features.post.service.TagService;
import com.devHub.proj.features.post.service.mapper.ProjectMapper;
import com.devHub.proj.features.post.service.validator.ProjectValidator;
import com.devHub.proj.global.exception.NotFoundException;
import com.devHub.proj.global.models.*;
import com.devHub.proj.global.repository.ProjectRepository;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @Mock
    private ProjectRepository projectRepo;

    @Mock
    private TagService tagService;

    @Mock
    private ReactionService reactionService;

    @Mock
    private ProjectValidator validator;

    @Mock
    private ProjectMapper projectMapper;

    @InjectMocks
    private ProjectService projectService;

    private final User owner = new User("username", "password", "email", 1L);

    @Test
    void shouldCreateProjectSuccessfully() {

        CreatePostRequest request = new CreatePostRequest(
                "DevHub",
                "https://github.com/test/devhub",
                "https://devhub.com",
                "Projeto de teste",
                List.of(new TagRequest("Java")));

        

        when(tagService.findByName("Java"))
                .thenReturn(Optional.of(new Tag("Java")));

        when(projectMapper.toProject(
                any(),
                any(),
                any())).thenReturn(new Project());

        projectService.createProject(request, owner);

        verify(validator).validate(request);
        verify(projectRepo).save(any(Project.class));
    }

    @Test
    void shouldGetProjectSuccessfully() {

        Project project = new Project(
                "Name",
                "github_url",
                "link_url",
                "description",
                new HashSet<>(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                List.of(),
                owner);

        Page<Project> page = new PageImpl<>(
                List.of(project),
                PageRequest.of(0, 10),
                1);

        when(projectRepo.findAll(any(Pageable.class)))
                .thenReturn(page);

        when(reactionService.getReactionInfo(any(), any()))
                .thenReturn(
                        new ReactionCountAndStatus(
                                0,
                                false,
                                0,
                                false));

        when(projectMapper.toProjectsResponse(
                any(),
                any(),
                any())).thenReturn(mock(ProjectsResponse.class));

        Page<ProjectsResponse> result = projectService.getAllProjects(owner, 0, 10);

        Assertions.assertNotNull(result);

        Assertions.assertEquals(
                1,
                result.getTotalElements());

        verify(projectRepo)
                .findAll(any(Pageable.class));

    }

    @Test
    void shouldUpdateProjectSuccessfully() {

        Long id = 1L;

        Project project = new Project(
                "Nome antigo",
                "github",
                "link",
                "desc",
                new HashSet<>(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                List.of(),
                owner);

        CreatePostRequest request = new CreatePostRequest(
                "Novo",
                "github novo",
                "link novo",
                "desc nova",
                List.of(new TagRequest("Java")));

        when(projectRepo.findById(id))
        .thenReturn(Optional.of(project));

when(tagService.findByName("Java"))
        .thenReturn(Optional.of(new Tag("Java")));

when(projectRepo.save(any()))
        .thenAnswer(i -> i.getArgument(0));


doAnswer(invocation -> {

    Project p = invocation.getArgument(0);
    CreatePostRequest req = invocation.getArgument(1);
    List<Tag> tags = invocation.getArgument(2);

    p.setName(req.name());
    p.setDescription(req.description());
    p.setGithub_url(req.LinkGithub());
    p.setLink_url(req.linkProjeto());
    p.setTags(tags);

    return null;

}).when(projectMapper)
.updateProject(any(), any(), any());



Project result = projectService.updateProject(
        id,
        request,
        owner);



Assertions.assertEquals(
        "Novo",
        result.getName()
);


verify(projectRepo).save(project);

        

    }

    @Test
    void shouldDeleteProjectSuccessfully() {

        Long id = 1L;

        Project project = new Project(
                "Nome",
                "github",
                "link",
                "desc",
                new HashSet<>(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                List.of(),
                owner);

        when(projectRepo.findById(id))
                .thenReturn(Optional.of(project));

        projectService.deleteProject(id, owner);

        verify(projectRepo)
                .delete(project);

    }

    @Test
    void shouldThrowNotFoundExceptionWhenDeletingNonExistentProject() {

        Long id = 1L;

        when(projectRepo.findById(id))
                .thenReturn(Optional.empty());

        Assertions.assertThrows(
                NotFoundException.class,
                () -> projectService.deleteProject(id, owner));

        verify(projectRepo)
                .findById(id);

        verify(projectRepo, never())
                .delete(any());

    }

}