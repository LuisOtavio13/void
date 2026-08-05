package com.devHub.proj.globalsearch.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.devHub.proj.globalsearch.dto.GlobalSearchResultDTO;
import com.devHub.proj.globalsearch.dto.ProjectSearchItemDTO;
import com.devHub.proj.globalsearch.dto.SearchResultResponse;
import com.devHub.proj.globalsearch.dto.SearchResultResponseUser;
import com.devHub.proj.globalsearch.repository.GlobalSearchRepository;
import com.devHub.proj.globalsearch.utils.SearchType;
import com.devHub.proj.repository.ProjectRepo;
import com.devHub.proj.repository.UserRepo;

@Service
public class GlobalSearchService {
    private final GlobalSearchRepository repository;
    private final UserRepo userRepo;
    private final ProjectRepo projectRepo;

    public GlobalSearchService(GlobalSearchRepository repository, UserRepo userRepo, ProjectRepo projectRepo) {
        this.repository = repository;
        this.userRepo = userRepo;
        this.projectRepo = projectRepo;
    }
    public List<SearchResultResponse> search(String term){
        List<GlobalSearchResultDTO> dbResul = repository.findAll(term);
        List<SearchResultResponse> out = new ArrayList<>();

        for(GlobalSearchResultDTO res : dbResul){
            Long recordId = res.getRecordId();

            if("projects".equalsIgnoreCase(res.getSourceTable())){
                projectRepo.findById(recordId).ifPresent(project ->{
                    ProjectSearchItemDTO projectSearch = new ProjectSearchItemDTO(
                        SearchType.PROJECT,
                        project.getId(),
                        project.getName()
                    );
                    out.add(projectSearch);
                });
            }
            if("users".equalsIgnoreCase(res.getSourceTable())){
                userRepo.findById(recordId).ifPresent(user ->{
                    SearchResultResponseUser userSearch = new SearchResultResponseUser(
                        SearchType.USER,
                        user.getId(),
                        user.getName(),
                        user.getAvatar_url()
                    );
                    out.add(userSearch);
                });
            }
        }
        return out;
    }
    public GlobalSearchRepository getRepository() {
        return repository;
    }
    public UserRepo getUserRepo() {
        return userRepo;
    }
    public ProjectRepo getProjectRepo() {
        return projectRepo;
    }


}
