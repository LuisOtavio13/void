import { HiOutlineReply } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";

import { LikeDislike } from "./like-deslike";
import { DropDownPost } from "./drop-down";

interface VoteRowProps {
  likesCount: number;
  desLikesCount: number;
  id: number;
  isLikedByUser: boolean;
  isDesLikedByUser: boolean;
  onReply: () => void;
  userID: number;
  thisUserIsOwner: boolean;
  content: string;
}

export function VoteRow({
  likesCount,
  id,
  isLikedByUser,
  isDesLikedByUser,
  desLikesCount,
  onReply,
  userID,
  thisUserIsOwner,
  content,
}: VoteRowProps) {
  return (
    <div className="mt-1 flex items-center gap-0.5 text-muted-foreground">
      <LikeDislike
        id={id}
        initialLikes={likesCount}
        liked={isLikedByUser}
        disliked={isDesLikedByUser}
        initialDislikes={desLikesCount}
        sla={false}
      />

      <button
        onClick={onReply}
        className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-colors hover:bg-accent"
      >
        <HiOutlineReply className="size-3.5" /> Responder
      </button>

      <button className="hidden items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-colors hover:bg-accent sm:flex">
        <IoIosShareAlt className="size-3.5" /> Compartilhar
      </button>

      <DropDownPost
        userID={userID}
        title={content}
        thisUserIsOwner={thisUserIsOwner}
        postId={id}
      />
    </div>
  );
}
