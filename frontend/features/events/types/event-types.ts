import { PostCreatedEvent, PostDeletedEvent, PostUpdatedEvent, ReactionProjectUpdatedEvent } from "./dto-types";



export type EventMap = {
  "post.created": PostCreatedEvent
  "post.updated": PostUpdatedEvent;
  "post.deleted": PostDeletedEvent;
  "post.reaction.updated": ReactionProjectUpdatedEvent;
};