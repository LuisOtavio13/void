package com.devHub.proj.post;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devHub.proj.models.Like;
import com.devHub.proj.models.Project;
import com.devHub.proj.models.Tag;
import com.devHub.proj.models.User;
import com.devHub.proj.post.dto.request.CreatePostRequest;
import com.devHub.proj.post.dto.request.TagRequest;
import com.devHub.proj.post.dto.response.ProjectsResponse;
import com.devHub.proj.post.exception.NotFoundException;
import com.devHub.proj.post.service.PostService;
import com.devHub.proj.repository.ProjectRepo;
import com.devHub.proj.repository.TagRepo;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @Mock
    private ProjectRepo projectRepo;

    @Mock
    private TagRepo tRepo;
    
    
    private User owner = new User("username", "password", "email", 1L);

    @InjectMocks
    private PostService servicesPosts;

    @Test
    private void shouldCreateProjectSuccessfully() {

        when(tRepo.findByName("Java"))
                .thenReturn(Optional.empty());

        when(tRepo.save(any(Tag.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        CreatePostRequest request = new CreatePostRequest(
                "DevHub",
                "https://github.com/test/devhub",
                "https://devhub.com",
                "Projeto de teste",
                List.of(new TagRequest("Java")));

        User user = new User();

        servicesPosts.createPost(request, user);

        verify(tRepo).save(any(Tag.class));
        verify(projectRepo).save(any(Project.class));
    }

    @Test
    private void shouldGetProjectSuccessfully(){
        

        List<Tag> tags = List.of(new Tag("sla")); 
        List<Project> projects = List.of(new Project("Name", "github_url", "link_url",
            "description",
            new HashSet<Like>(),
            LocalDateTime.now(), 
            LocalDateTime.now(), 
            tags, owner));
        Pageable pg = PageRequest.of(0, 10);
        Page<Project> page = new PageImpl<>(projects, pg, projects.size());

        when(projectRepo.findAll(any(Pageable.class))).thenReturn(page);

        Page<ProjectsResponse> out = servicesPosts.getAllPosts(owner, 0, 10);


        Assertions.assertNotNull(out);
        Assertions.assertEquals(1, out.getTotalElements());
        Assertions.assertEquals(0, out.getNumber());
        Assertions.assertEquals(10, out.getSize());
        Assertions.assertFalse(out.getContent().isEmpty());

        // this is test of conversion
        Assertions.assertEquals("Name", out.getContent().get(0).title());
        Assertions.assertEquals("github_url", out.getContent().get(0).githubLink());
        Assertions.assertEquals("link_url", out.getContent().get(0).demoLink());
        Assertions.assertEquals("description", out.getContent().get(0).description());

        verify(projectRepo).findAll(any(Pageable.class));

        
    }

    @Test
    void shouldUpdateProjectSuccessfully(){
        Long id = 1L;
            Project existingProject = new Project("Nome Antigo", "github_antigo", "link_antigo", "Descricao Antiga", new HashSet<>(), LocalDateTime.now(), LocalDateTime.now(), List.of(), owner);

        CreatePostRequest request = new CreatePostRequest(
                "DevHub Atualizado",
                "https://github.com-novo",
                "https://devhub-novo.com",
                "Nova descricao do projeto",
                List.of(new TagRequest("Java")));

        when(projectRepo.findById(id)).thenReturn(Optional.of(existingProject));
        when(tRepo.findByName("Java")).thenReturn(Optional.of(new Tag("Java")));
        when(projectRepo.save(any(Project.class))).thenAnswer(invocation -> invocation.getArgument(0));

        
        Project result = servicesPosts.updatePost(id, request);

        
        Assertions.assertNotNull(result);
        Assertions.assertEquals("DevHub Atualizado", result.getName());
        Assertions.assertEquals("Nova descricao do projeto", result.getDescription());
        Assertions.assertEquals("https://github.com-novo", result.getGithub_url());
        Assertions.assertEquals("https://devhub-novo.com", result.getLink_url());
        Assertions.assertEquals(1, result.getTags().size());
        Assertions.assertEquals("Java", result.getTags().get(0).getName());
        Assertions.assertNotNull(result.getUpdatedAt());

        verify(projectRepo).findById(id);
        verify(projectRepo).save(existingProject);
    }
    @Test
    void shouldDeleteProjectSuccessfully() {
        Long id = 1L;
        Project existingProject = new Project("Nome", "github_url", "link_url",
            "description",
            new HashSet<Like>(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            List.of(), owner);

        when(projectRepo.findById(id)).thenReturn(Optional.of(existingProject));
        servicesPosts.deletePost(id,owner );

        verify(projectRepo).deleteById(id);
    }
    @Test
    void shouldThrowNotFoundExceptionWhenDeletingNonExistentProject() {
        Long id = 1L;

        when(projectRepo.findById(id)).thenReturn(Optional.empty());

        Assertions.assertThrows(NotFoundException.class, () -> servicesPosts.deletePost(id, owner));

        verify(projectRepo).findById(id);
        verify(projectRepo, never()).deleteById(id);
    }
    
    
}
