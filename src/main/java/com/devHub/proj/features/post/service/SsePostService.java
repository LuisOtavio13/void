package com.devHub.proj.features.post.service;


import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.devHub.proj.features.post.dto.response.ProjectsResponse;

@Service 
public class SsePostService {
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(0L);
        emitters.add(emitter);
        

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));
        try{
            emitter.send(SseEmitter.event().name("INIT").data("Connected to SSE"));
        } catch (Exception e) {
            emitters.remove(emitter);
        }
        return emitter;
    }

    public void createNewPost(ProjectsResponse projectsResponse) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("NEW_POST").data(projectsResponse));
            } catch (Exception e) {
                emitters.remove(emitter);
            }
        }
    }
}
