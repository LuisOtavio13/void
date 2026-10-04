package com.devHub.proj.features.post.controller;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.devHub.proj.features.post.service.SsePostService;

@RestController
@RequestMapping("/posts")
public class SsePostController {

    private final SsePostService ssePostService;

    public SsePostController(SsePostService ssePostService) {
        this.ssePostService = ssePostService;
    }

    @GetMapping("/subscribe")
    public SseEmitter subscribe() {
        return ssePostService.subscribe();
    }

}
