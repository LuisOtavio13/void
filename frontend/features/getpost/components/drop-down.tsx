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

function Item({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <DropdownMenuItem
      className="flex cursor-pointer items-center gap-2"
      onClick={onClick}
    >
      {icon}
      {text}
    </DropdownMenuItem>
  );
}

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

  const [editMode, setEditMode] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  async function handleDelete() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();

        toast.error(
          error.message || "Erro ao excluir o post. Tente novamente."
        );

        return;
      }

      toast.success("Post excluído com sucesso!");

      router.push("/pages/home");
    } catch (error) {
      toast.error("Erro ao excluir o post.");
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
                  onClick={handleDelete}
                />
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
