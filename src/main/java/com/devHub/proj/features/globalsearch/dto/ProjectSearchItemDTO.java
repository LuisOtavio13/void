package com.devHub.proj.features.globalsearch.dto;

import com.devHub.proj.features.globalsearch.utils.SearchType;

public class ProjectSearchItemDTO extends SearchResultResponse {
    public ProjectSearchItemDTO(SearchType searchType,Long id, String nome){
        super(searchType, id, nome);
    }
}
