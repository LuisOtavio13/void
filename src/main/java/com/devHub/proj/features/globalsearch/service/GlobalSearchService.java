package com.devHub.proj.features.globalsearch.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.devHub.proj.features.globalsearch.dto.GlobalSearchResultDTO;
import com.devHub.proj.features.globalsearch.dto.ProjectSearchItemDTO;
import com.devHub.proj.features.globalsearch.dto.SearchResultResponse;
import com.devHub.proj.features.globalsearch.dto.SearchResultResponseUser;
import com.devHub.proj.features.globalsearch.repository.GlobalSearchRepository;
import com.devHub.proj.features.globalsearch.utils.SearchType;
import com.devHub.proj.global.repository.ProjectRepository;
import com.devHub.proj.global.repository.UserRepository;

@Service
public class GlobalSearchService {
    private final GlobalSearchRepository repository;
    private final UserRepository userRepo;
    private final ProjectRepository projectRepo;

    public GlobalSearchService(GlobalSearchRepository repository, UserRepository userRepo, ProjectRepository projectRepo) {
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


}
