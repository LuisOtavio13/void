import { CardItem } from "../types/types";

let activeEventSource: EventSource | null = null;

export function subscribeToPosts(
  onNewPost: (post: CardItem) => void,
) {
  if (activeEventSource) {
    activeEventSource.close();
    activeEventSource = null;
  }

  const eventSource = new EventSource(
    `${process.env.NEXT_PUBLIC_API_URL}posts/subscribe`,
  );
  activeEventSource = eventSource;

  const handleNewPost = (event: Event) => {
    const message = event as MessageEvent;
    const post: CardItem = JSON.parse(message.data);
    onNewPost(post);
  };

  eventSource.addEventListener("NEW_POST", handleNewPost);

  eventSource.onerror = (error) => {
    console.error("Erro na conexão SSE:", error);
    eventSource.close();

    if (activeEventSource === eventSource) {
      activeEventSource = null;
    }
  };

  return () => {
    eventSource.removeEventListener("NEW_POST", handleNewPost);
    eventSource.close();

    if (activeEventSource === eventSource) {
      activeEventSource = null;
    }
  };
}