package com.devHub.proj.features.event.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.devHub.proj.features.event.service.SseEventService;

@RestController 
@RequestMapping("/sse")
public class SseController {
    
    private final SseEventService sseEventService;

    public SseController(SseEventService sseEventService) {
        this.sseEventService = sseEventService;
    }

    @GetMapping(path = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {
        return sseEventService.subscribe();
    }
}
