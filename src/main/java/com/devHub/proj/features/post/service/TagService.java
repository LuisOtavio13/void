package com.devHub.proj.features.post.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.devHub.proj.global.models.Tag;
import com.devHub.proj.global.repository.TagRepository;

@Service
public class TagService {
    private final TagRepository tRepository;

    public TagService(TagRepository tRepository){
        this.tRepository = tRepository;
    }

    public Optional<Tag> findByName(String name){
        return tRepository.findByName(name);
    }

    public Tag newTag(String name){
        Tag tag = new Tag(name);
        tRepository.save(tag);
        return tag;
    }
}
