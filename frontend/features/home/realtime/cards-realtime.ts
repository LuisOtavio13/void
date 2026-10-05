import { eventBus } from "@/features/events/event-bus";
import { CardItem } from "../types/types";

export function cardsRealtime({setCards}: {setCards: React.Dispatch<React.SetStateAction<CardItem[]>>}) {
    const unsubscribeCreated = eventBus.on("post.created",
    (data) =>{
        setCards((prev) => [data, ...prev]);
    }
    );
    const unsubscribeUpdated = eventBus.on("post.updated",
    (data) =>{
        setCards((prev) => {
            const updatedCards = prev.map((card) => {
                if (card.id === data.id) {
                    return data;
                }
                return card;
            });
            return updatedCards;
        });
    });

    const unsubscribeDeleted = eventBus.on("post.deleted",
    (data) =>{
        setCards((prev) => {
            const updatedCards = prev.filter((card) => card.id !== data.postId);
            return updatedCards;
        });
    });

    return () => {
        unsubscribeCreated();
        unsubscribeUpdated();
        unsubscribeDeleted();
    };
}