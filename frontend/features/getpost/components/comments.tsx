"use client";

import { comments } from "../types/comments";
import { UserDatails } from "./page-user-post";
import styles from "./comment-thread.module.css";
import { MD } from "@/shared/components/MD";
import { CommentFormData, CommentInput } from "./CommentInput";
import { toast } from "sonner";
import { PostComment } from "../services/post-comments";
import { useRouter } from "next/navigation";
import { VoteRow } from "./vote-row";
import { useCommentThread } from "../hooks/use-comment-thread";

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
  const {
    collapsed,
    rootRef,
    lastReplyHeaderRef,
    isReplying,
    setIsReplying,
    visibleReplies,
    remainingReplies,
    showAllReplies,
    setShowAllReplies,
    hasReplies,
    setCollapsed,
  } = useCommentThread(comment);

  const router = useRouter();
  
  function requestLogin() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:login-required"));
    }
  }

  async function handleCreateComment(data: CommentFormData) {
    if (!jwt || jwt === "-1") {
      requestLogin();
      return;
    }

    try {
      await PostComment(
        data.content,
        projectId,
        jwt,
        comment.id
      );
      setIsReplying(false);

      toast.success("Comentário publicado!");
      router.refresh();
    } catch (error) {
      if (error instanceof Error && (error.message.includes("403") || error.message.includes("401"))) {
        requestLogin();
        return;
      }

      toast.error("Erro ao publicar comentário.");
    }
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
            setIsReplying((prev) => !prev);
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

          {isReplying && (
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