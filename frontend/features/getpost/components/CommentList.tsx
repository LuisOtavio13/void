"use client";

import { useEffect, useState } from "react";
import { comments } from "../types/comments";
import { get_comments } from "../services/get-comments";
import { Comment } from "./comments";
import { toast } from "sonner";
import { PostComment } from "../services/post-comments";

import { CommentInput, CommentFormData } from "./CommentInput";
import { useRouter } from "next/navigation";

interface CommentListProps {
  postId: number;
  jwt?: string;
}


export function CommentList({ postId, jwt }: CommentListProps) {
  const [comments, setComments] = useState<comments[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();




  useEffect(() => {
    async function loadComments() {
      try {
        setLoading(true);

        const data = await get_comments(postId, jwt);

        setComments(data);
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, [postId, jwt]);

  async function handleCreateComment(data: CommentFormData) {
    if (!jwt) {
      toast.error("Você precisa estar logado para comentar.");
      return;
    }

    try {
      const newComment = await PostComment(
        data.content,
        postId,
        jwt
      );

      setComments((prev) => [...prev, newComment]);

      toast.success("Comentário publicado!");
      router.refresh();
    } catch {
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
      />
      {comments.map((comment) => (
        <Comment
          jwt={jwt?? ""}
          projectId={postId}
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
}