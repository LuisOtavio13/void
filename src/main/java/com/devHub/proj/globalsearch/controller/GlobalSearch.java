package com.devHub.proj.globalsearch.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devHub.proj.globalsearch.dto.SearchResultResponse;
import com.devHub.proj.globalsearch.model.GlobalSearchEntity;
import com.devHub.proj.globalsearch.service.GlobalSearchService;

@RequestMapping("/search")
@RestController
public class GlobalSearch {
    private final GlobalSearchService globalSearchService;
    public GlobalSearch(GlobalSearchService globalSearchService){
        this.globalSearchService = globalSearchService;
    }

    @GetMapping()
    public List<SearchResultResponse> search(@RequestParam String termo){
        return globalSearchService.search(termo);
    }
   
}
