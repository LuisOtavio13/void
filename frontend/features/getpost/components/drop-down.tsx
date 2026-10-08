"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { getUser } from "@/shared/context/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { deleteComment } from "../services/delete-comment";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { CommentInput } from "./CommentInput";
import { Item } from "@/shared/components/dropDownItem";


export function DropDownPost({
  postId,
  userID,
  title,
  thisUserIsOwner,
}: {
  postId: number;
  userID: number;
  title: string;
  thisUserIsOwner: boolean;
}) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });


  function handleDeleteClick() {
    setDeleteDialogOpen(true);
  }

  async function handleDeleteConfirm() {
    try {
      await deleteComment(postId, user?.jwt || "");

      toast.success("Post deletado com sucesso!");
      setDeleteDialogOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao excluir o post.",
      );

      console.error(error);
    }
  }

  if (!thisUserIsOwner && userID !== user?.id) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
              flex h-7 w-7
              items-center justify-center
              rounded-md
              text-zinc-400
              transition-all duration-200
              hover:bg-zinc-800
              hover:text-white
              active:scale-95
            "
          >
            <FiMoreHorizontal size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 text-zinc-200"
        >
          <DropdownMenuGroup>
            {thisUserIsOwner && (
              <>
                <Item
                  text="Editar"
                  icon={<FaEdit />}
                  onClick={() => setEditMode(true)}
                />

                <Item
                  text="Excluir"
                  icon={<FiTrash2 />}
                  onClick={handleDeleteClick}
                />
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {editMode && (
        <CommentInput onSubmit={async (data) => {
          try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}comments/${postId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.jwt}`,
              },
              body: JSON.stringify({
                content: data.content,
                projectId: postId,
              }),
            });

            toast.success("Comentário atualizado com sucesso!");
            setEditMode(false);
            router.refresh();
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Erro ao atualizar o comentário.",
            );
          }
        }} />
      )}

      <ConfirmDialog
        title="Excluir comentário?"
        description={`Tem certeza que deseja excluir "${title}"? Essa ação não pode ser desfeita.`}
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
