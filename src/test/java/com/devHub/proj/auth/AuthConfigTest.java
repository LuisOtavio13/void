package com.devHub.proj.auth;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.devHub.proj.features.auth.dto.request.LoginRequest;
import com.devHub.proj.features.auth.dto.request.RegistroRequest;
import com.devHub.proj.features.auth.service.AuthService;
import com.devHub.proj.global.models.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
public class AuthConfigTest {

    @Autowired
    private WebApplicationContext applicationContext;

    private MockMvc mockMvc;

    @MockitoBean
    private AuthService serviceAuth;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext)
                .apply(springSecurity())
                .build();
    }

    @Test
    void shouldLoginSuccessfully() throws Exception {

        Long id = 1L;

        LoginRequest loginRequest = new LoginRequest("test@email.com", "password123");

        User user = instantiateUserExample(id);

        when(serviceAuth.findByEmail(anyString())).thenReturn(user);

        when(serviceAuth.loginIsValid(anyString(), anyString())).thenReturn(true);
        when(serviceAuth.gerarToken(anyString(), anyString())).thenReturn("fake");

        mockMvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest))).andExpectAll(status().isOk());

    }

    @Test
    void shouldRegisterUserSuccessfully() throws  Exception{
        Long id = 1L;
        User user = instantiateUserExample(id);

        RegistroRequest registroRequest = new RegistroRequest(user.getName(), user.getEmail(), user.getPassword());
        when(serviceAuth.saveUser(anyString(), anyString(), anyString())).thenReturn(user);
        mockMvc.perform(post("/auth/register").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(registroRequest)))
        .andExpectAll(status().isCreated());

    }

    @Test
    void shouldReturnCurrentUserDetailsWhenAuthenticated() throws Exception {
        
        Long id = 1L;
        User authenticatedUser = instantiateUserExample(id);
       
        mockMvc.perform(get("/auth/me")
                .with(user(authenticatedUser)) 
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(authenticatedUser.getId()))
                .andExpect(jsonPath("$.name").value(authenticatedUser.getName()))
                .andExpect(jsonPath("$.email").value(authenticatedUser.getUsername()));
    }

    @Test
    void shouldReturn404NotFoundWhenUserDoesNotExist() throws Exception {
        Long idInexistente = 99L;
        when(serviceAuth.findById(idInexistente)).thenReturn(null);

        mockMvc.perform(get("/auth/user/" + idInexistente)
                .with(user("user_test").roles("ADMIN"))
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturn400BadRequestWhenLoginCredentialsAreInvalid() throws Exception {
        LoginRequest loginInvalido = new LoginRequest("errado@email.com", "senha");

        when(serviceAuth.loginIsValid(anyString(), anyString())).thenReturn(false);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginInvalido)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturn401UnauthorizedWhenAccessingMeWithoutAuthentication() throws Exception {
        mockMvc.perform(get("/auth/me")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden()); 
    }

    @Test
    void shouldReturnUserWhenSearchingByAuthenticatedID() throws Exception {

        Long id = 1L;

        User users = instantiateUserExample(id);

        mockMvc.perform(get("/auth/user/" + users.getId()).with(user("user_test").roles("ADMIN"))
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(users.getId()))
                .andExpect(jsonPath("$.name").value(users.getName()))
                .andExpect(jsonPath("$.email").value(users.getUsername()));
    }

    private User instantiateUserExample(Long id) {

        User users = new User("Username", "password", "email");
        users.setId(id);
        users.setRole("ADMIN");

        when(serviceAuth.findById(id)).thenReturn(users);

        return users;
    }
}
