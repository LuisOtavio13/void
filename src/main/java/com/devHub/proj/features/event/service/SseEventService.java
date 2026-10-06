package com.devHub.proj.features.event.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class SseEventService {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(0L);

        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        try {
            emitter.send(
                SseEmitter.event()
                    .data(Map.of(
                        "type", "connected",
                        "data", "Connected to SSE"
                    ))
            );
        } catch (Exception e) {
            emitters.remove(emitter);
        }

        return emitter;
    }

    public void sendEvent(EventType eventType, Object data) {

        Map<String, Object> event = Map.of(
            "type", eventType.value(),
            "data", data
        );

        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(
                    SseEmitter.event()
                        .data(event)
                );
            } catch (Exception e) {
                emitters.remove(emitter);
            }
        }
    }
}