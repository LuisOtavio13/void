import { PostCreatedEvent, PostDeletedEvent, PostUpdatedEvent } from "./dto-types";



export type EventMap = {
  "post.created": PostCreatedEvent
  "post.updated": PostUpdatedEvent;
  "post.deleted": PostDeletedEvent;
};