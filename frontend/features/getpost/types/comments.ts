import { User } from "@/shared/types/UserType";
export interface comments{
    id: number,
    user: User,
    content: string,
    likesCount: number,
    desLikesCount: number,
    isLikedByUser: boolean,
    isDesLikedByUser: boolean,
    createdAt: string,
    updatedAt: string,
    replies: comments[],
    nestedRepliesCount: string | null;
    parentCommentId: number
}