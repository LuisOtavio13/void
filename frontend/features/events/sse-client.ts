import { eventBus } from "./event-bus";
import { EventMap } from "./types/event-types";

let eventSource: EventSource | null = null;

const EVENT_NAMES: Array<keyof EventMap> = ["post.created", "post.updated", "post.deleted"];

export function connectToSSE() {
    if (eventSource) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        return;
    }

    eventSource = new EventSource(`${apiUrl}sse/subscribe`);

    EVENT_NAMES.forEach((eventName) => {
        eventSource?.addEventListener(eventName, (event) => {
            try {
                const payload = JSON.parse((event as MessageEvent).data) as EventMap[typeof eventName];
                console.log(`Received SSE event: ${eventName}`, payload);
                eventBus.emit(eventName, payload);
            } catch (error) {
                console.error(`Failed to parse SSE event ${eventName}:`, error);
            }
        });
    });

    eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);
        eventSource?.close();
        eventSource = null;
    };
}

export function disconnectFromSSE() {
    if (eventSource) {
        eventSource.close();
        eventSource = null;
    }
}