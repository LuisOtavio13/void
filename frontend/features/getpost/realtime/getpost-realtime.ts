import { eventBus } from "@/features/events/event-bus";
import { Post } from "../types/type";
import { CardItem } from "@/features/home/types/types";

function toIsoString(value: Date | string | undefined | null): string {
    if (!value) return "";
    if (value instanceof Date) return value.toISOString();
    return new Date(value).toISOString();
}

export function cardItemToPost(
    card: CardItem,
    thisUserIsOwner: boolean
): Post {
    return {
        ...card,
        thisUserIsOwner,
        createdAt: toIsoString(card.createdAt),
        updatedAt: toIsoString(card.updatedAt),
    };
}

export function getPostRealTime({
    setPost,
    id,
    idUser
}: {
    setPost: React.Dispatch<React.SetStateAction<Post>>;
    id: number;
    idUser : number;
}) {
    const unsubscribeReactionUpdate = eventBus.on(
        "post.reaction.updated",
        (data) => {
            if (data.Id !== id) return;

            setPost((prev) => ({
                ...prev,
                likesCount: data.likesCount,
                desLikesCount: data.desLikesCount,
                isLikedByUser: data.isLikedByUser,
                isDesLikedByUser: data.isDesLikedByUser,
            }));
        }
    );

    const unsubscribePostUpdate = eventBus.on("post.updated", (aa) =>{
        if(aa.id === id){
            setPost(cardItemToPost(aa, idUser === aa.user.id));
        }
    })

    return () => {
        unsubscribeReactionUpdate();
        unsubscribePostUpdate();
    };
}