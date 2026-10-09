"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { comments } from "../types/comments";
import { get_comments } from "../services/get-comments";
import { Comment } from "./comments";
import { toast } from "sonner";
import { PostComment } from "../services/post-comments";

import { CommentInput, CommentFormData } from "./CommentInput";
import { useRouter } from "next/navigation";
import { getUser } from "@/shared/context/user";
import { useQuery } from "@tanstack/react-query";
import { commentsRealtime } from "../realtime/comments-realtime";

interface CommentListProps {
  postId: number;
  jwt?: string;
}


export function CommentList({ postId, jwt }: CommentListProps) {
  const [comments, setComments] = useState<comments[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  

  useEffect(() => {
    if(!jwt){return ;}
    commentsRealtime({ setComments });
  }, [jwt])
  useEffect(() => {
    async function loadComments() {
      try {
        setLoading(true);

        const data = await get_comments(postId, jwt);
        setComments(data);
      } catch (error) {
        toast.error("Erro ao carregar comentários.");
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, [postId, jwt]);

  

  async function handleCreateComment(data: CommentFormData) {
    

    try {
      await PostComment(
        data.content,
        postId,
        jwt?? ""
      );

      toast.success("Comentário publicado!");
    } catch (error) {
      if (error instanceof Error && (error.message.includes("403") || error.message.includes("401"))) {
        return;
      }

      toast.error("Erro ao publicar comentário.");
    }
  }
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex animate-pulse gap-3"
          >
            <div className="h-10 w-10 rounded-full bg-muted" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

 

  if (comments.length === 0) {
    return (
      <>
        <CommentInput
          onSubmit={handleCreateComment}
          disabled={false}
        />
        <div className="py-8 text-center text-sm text-muted-foreground">
          Nenhum comentário ainda.
        </div>
      </>
    );
  }

  return (
    <div>
      <CommentInput
        onSubmit={handleCreateComment}
        disabled={false}
      />
      {comments.map((comment) => (
        <Comment
          jwt={jwt ?? ""}
          projectId={postId}
          key={comment.id}
          comment={comment}
          userID={user?.id ?? 0}
        />
      ))}
    </div>
  );
}