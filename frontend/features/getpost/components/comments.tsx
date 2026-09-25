"use client";

import { useEffect, useRef, useState } from "react";

import { comments } from "../types/comments";
import { UserDatails } from "./page-user-post";
import styles from "./comment-thread.module.css";
import { IoIosShareAlt } from "react-icons/io"
import { HiOutlineReply } from "react-icons/hi";
import { LikeDislike } from "./like-deslike";
import { MD } from "@/shared/components/MD";
import { CommentFormData, CommentInput } from "./CommentInput";
import { toast } from "sonner";
import { PostComment } from "../services/post-comments";
import { useRouter } from "next/navigation";
import { DropDownPost } from "./drop-down";
function VoteRow({
  likesCount,
  id,
  isLikedByUser,
  isDesLikedByUser,
  desLikesCount,
  onReply,
  userID,
  thisUserIsOwner,
  content
}: {
  likesCount: number;
  desLikesCount: number;
  id: number;
  isLikedByUser: boolean;
  isDesLikedByUser: boolean;
  onReply: () => void;
  userID: number;
  thisUserIsOwner: boolean;
  content: string;

}) {
  return (
    <div className="mt-1 flex items-center gap-0.5 text-muted-foreground">
      <LikeDislike id={id}
        initialLikes={likesCount}
        liked={isLikedByUser}
        disliked={isDesLikedByUser}
        initialDislikes={desLikesCount}
        sla={false}
      />
      <button
        onClick={onReply}
        className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-colors hover:bg-accent">
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

export function Comment({
  comment,
  isReply = false,
  jwt,
  projectId,
  userID
}: {
  comment: comments;
  isReply?: boolean;
  userID: number;
  jwt: string,
  projectId: number
}) {
  const [collapsed, setCollapsed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lastReplyHeaderRef = useRef<HTMLDivElement>(null);
  const [repile, setRepile] = useState(false);
  const replies = comment.replies ?? [];
  const [showAllReplies, setShowAllReplies] = useState(false);

  const visibleReplies = showAllReplies
    ? replies
    : replies.slice(0, 3);

  const remainingReplies = Math.max(0, replies.length - 3);
  const nestedRepliesCount = comment.nestedRepliesCount
    ? Number(comment.nestedRepliesCount)
    : 0;
  const hasMoreNestedReplies = nestedRepliesCount >= 1;
  useEffect(() => {

    if (!hasReplies || collapsed || !rootRef.current || !lastReplyHeaderRef.current) return;

    const measure = () => {
      const rootEl = rootRef.current;
      const lastReplyEl = lastReplyHeaderRef.current;

      if (!rootEl || !lastReplyEl) return;

      const rootRect = rootEl.getBoundingClientRect();
      const replyRect = lastReplyEl.getBoundingClientRect();

      const centerOfAvatar =
        replyRect.top -
        rootRect.top +
        20 / 2;

      const totalHeight = rootEl.clientHeight;

      const gapFromBottom = totalHeight - centerOfAvatar;

      rootEl.style.setProperty(
        "--tronco-bottom",
        `${Math.max(0, gapFromBottom)}px`
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rootRef.current);

    return () => ro.disconnect();
  }, [repile, replies.length, collapsed, showAllReplies]);

  const hasReplies = replies.length > 0;
  const router = useRouter();

  async function handleCreateComment(data: CommentFormData) {
    if (!jwt) {
      toast.error("Você precisa estar logado para comentar.");
      return;
    }

    try {
      const newComment = await PostComment(
        data.content,
        projectId,
        jwt,
        comment.id
      );
      setRepile(false);


      toast.success("Comentário publicado!");
      router.refresh();
    } catch {
      toast.error("Erro ao publicar comentário.");
    }
  }
  function handleLoadMoreReplies() {

  }

  return (
    <div ref={rootRef} className={`${styles.commentRoot} ${isReply ? styles.replyItem : ""}`}>
      {hasReplies && !collapsed && (
        <div
          className={styles.threadlineStrip}
          onClick={() => setCollapsed(true)}
          aria-hidden
        />
      )}

      <div className={styles.header}>
        <UserDatails
          photo={comment.user.avatar_url}
          name={comment.user.name}
          createdAt={comment.createdAt}
          updatedAt={comment.updatedAt}
        />
      </div>

      <MD md={comment.content} className="ml-12 mt-1 text-sm text-foreground" />

      <div className="ml-12">
        <VoteRow
          onReply={() => {
            setRepile(!repile);
          }}
          likesCount={comment.likesCount}
          desLikesCount={comment.desLikesCount}
          id={comment.id}
          isDesLikedByUser={comment.isDesLikedByUser}
          isLikedByUser={comment.isLikedByUser}
          content={comment.content}
          userID={comment.user.id ?? 0}
          thisUserIsOwner={comment.user.id === userID}
        />
        <div className="mt-3">

          {repile && (
            <CommentInput onSubmit={handleCreateComment} />
          )}
        </div>
      </div>

      {hasReplies &&
        (collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            className="ml-12 mt-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Mostrar respostas
          </button>
        ) : (
          <div
            className={`${styles.threadLine} ml-[20px] mt-3 space-y-4 pl-[20px]`}
          >
            {visibleReplies.map((reply, i) => (
              <div
                key={reply.id}
                ref={
                  i === visibleReplies.length - 1
                    ? lastReplyHeaderRef
                    : undefined
                }
              >
                <Comment
                  comment={reply}
                  isReply
                  userID={userID}
                  jwt={jwt}
                  projectId={projectId}
                />
              </div>
            ))}

            {!showAllReplies && remainingReplies > 0 && (
              <button
                onClick={() => setShowAllReplies(true)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                + {remainingReplies} respostas
              </button>
            )}
          </div>
        ))}
    </div>
  );
}