import { eventBus } from "./event-bus";
import { EventMap } from "./types/event-types";

let eventSource: EventSource | null = null;

export function connectToSSE() {
    if (eventSource) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        return;
    }

    eventSource = new EventSource(`${apiUrl}sse/subscribe`);

    eventSource.onmessage = (event) => {
        try {
            const { type, data } = JSON.parse(event.data) as {
                type: keyof EventMap;
                data: EventMap[keyof EventMap];
            };

            eventBus.emit(type, data as never);
        } catch (error) {
            console.error("Failed to parse SSE event:", error);
        }
    };

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