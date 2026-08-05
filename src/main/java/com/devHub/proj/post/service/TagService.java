package com.devHub.proj.post.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.devHub.proj.models.Tag;
import com.devHub.proj.repository.TagRepo;

@Service
public class TagService {
    private final TagRepo tRepository;

    public TagService(TagRepo tRepository){
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
