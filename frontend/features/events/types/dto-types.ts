import { CardItem } from "@/features/home/types/types";

export type PostCreatedEvent = CardItem;
export type PostUpdatedEvent = CardItem;
export type PostDeletedEvent = { postId: number };
export type ReactionProjectUpdatedEvent = {
    Id: number; likesCount: number;
    desLikesCount: number;
    isLikedByUser: boolean;
    isDesLikedByUser: boolean;
}