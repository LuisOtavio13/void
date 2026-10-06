import { CommentCreatedEvent, PostCreatedEvent, PostDeletedEvent, PostUpdatedEvent, ReactionCommentUpdatedEvent, ReactionProjectUpdatedEvent } from "./dto-types";



export type EventMap = {
  "post.created": PostCreatedEvent
  "post.updated": PostUpdatedEvent;
  "post.deleted": PostDeletedEvent;
  "post.reaction.updated": ReactionProjectUpdatedEvent;
  "comment.reaction.updated": ReactionCommentUpdatedEvent;
  "comment.created": CommentCreatedEvent;
};