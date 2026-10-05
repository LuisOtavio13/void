import { eventBus } from "@/features/events/event-bus";
import { comments } from "../types/comments";

function addCommentToTree(
    comments: comments[],
    newComment: comments
): comments[] {
    if (newComment.parentCommentId === null) {
        return [...comments, newComment];
    }

    return comments.map((comment) => {
        if (comment.id === newComment.parentCommentId) {
            return {
                ...comment,
                replies: [...comment.replies, newComment],
            };
        }

        return {
            ...comment,
            replies: addCommentToTree(comment.replies, newComment),
        };
    });
}

function updateCommentInTree(
    comments: comments[],
    data: {
        Id: number;
        likesCount: number;
        desLikesCount: number;
        isLikedByUser: boolean;
        isDesLikedByUser: boolean;
    }
): comments[] {
    return comments.map((comment) => {
        if (comment.id === data.Id) {
            return {
                ...comment,
                likesCount: data.likesCount,
                desLikesCount: data.desLikesCount,
                isLikedByUser: data.isLikedByUser,
                isDesLikedByUser: data.isDesLikedByUser,
            };
        }

        return {
            ...comment,
            replies: updateCommentInTree(comment.replies, data),
        };
    });
}

function containsComment(
    comments: comments[],
    id: number
): boolean {
    return comments.some(
        (comment) =>
            comment.id === id ||
            containsComment(comment.replies, id)
    );
}

export function commentsRealtime({
    setComments,
}: {
    setComments: React.Dispatch<React.SetStateAction<comments[]>>;
}) {
    const unsubscribeReactionUpdated = eventBus.on(
        "comment.reaction.updated",
        (data) => {
            setComments((prev) =>
                updateCommentInTree(prev, data)
            );
        }
    );

    const unsubscribeCommentCreate = eventBus.on(
        "comment.created",
        (comment) => {
            setComments((prev) => {
                if (containsComment(prev, comment.id)) {
                    return prev;
                }

                return addCommentToTree(prev, comment);
            });
        }
    );

    return () => {
        unsubscribeReactionUpdated();
        unsubscribeCommentCreate();
    };
}