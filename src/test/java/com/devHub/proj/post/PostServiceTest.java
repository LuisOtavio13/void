package com.devHub.proj.post;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
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

import com.devHub.proj.models.Project;
import com.devHub.proj.models.Tag;
import com.devHub.proj.models.User;
import com.devHub.proj.post.dto.request.CreatePostRequest;
import com.devHub.proj.post.dto.request.TagRequest;
import com.devHub.proj.post.dto.response.ProjectsResponse;
import com.devHub.proj.post.service.PostService;
import com.devHub.proj.repository.ProjectRepo;
import com.devHub.proj.repository.TagRepo;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @Mock
    private ProjectRepo projectRepo;

    @Mock
    private TagRepo tRepo;

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
        User owner = new User("username", "password", "email", 1L);
        

        List<Tag> tags = List.of(new Tag("sla")); 
        List<Project> projects = List.of(new Project("Name", "github_url", "link_url",
            "description",
            0, 
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

}
