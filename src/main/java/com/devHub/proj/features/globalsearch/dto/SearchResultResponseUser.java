package com.devHub.proj.features.globalsearch.dto;

import com.devHub.proj.features.globalsearch.utils.SearchType;

public class SearchResultResponseUser extends SearchResultResponse{
  

    private String avatarUrl;

    public SearchResultResponseUser(SearchType searchType, Long id,String nome, String avatarUrl) {
        super(searchType, id, nome);
        this.avatarUrl = avatarUrl;
    }

    public SearchResultResponseUser() {
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
