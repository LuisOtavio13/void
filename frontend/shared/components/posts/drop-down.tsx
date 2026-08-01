"use client";
import { FiMenu, FiShare } from "react-icons/fi";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaShare } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/shared/context/user";
import { CreatePost } from "../create-post";
import { toast } from "sonner";
import { createPostSchema, CreatePostSchema } from "@/shared/schema/create-post";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
function Item({ text, icon, onClick }: { text: string; icon: React.ReactNode; onClick?: () => void }) {
  return (
    <DropdownMenuItem className="cursor-pointer flex items-center gap-2" onClick={onClick}>
      {icon}
      {text}
    </DropdownMenuItem>
  );
}
export function DropDownPost({ userID, title, content, tags, demoUrl, githubUrl, id }: { userID: number; title: string; content: string; tags?: string[]; demoUrl?: string; githubUrl?: string; id: number }) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: content,
      title: title,
      tags: tags || [],
      demoUrl: demoUrl || "",
      githubUrl: githubUrl || "",
    },
  });
  const isOwner = String(user?.id) === String(userID);
  console.log(isOwner + " " + userID + " " + user?.id);
  async function onSubmit(post: CreatePostSchema) {
    try {
      const sla = {
        name: post.title,
        description: post.content,
        LinkGithub: post.githubUrl,
        linkProjeto: post.demoUrl,
        tags: post.tags?.map((tag) => {
          return { name: tag };
        }),
      };
      console.log(sla);
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `posts/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.jwt}`,
        },
        body: JSON.stringify(sla),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Erro ao atualizar o post. Tente novamente.");
        return;
      }
      toast.success("Post atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar o post. Tente novamente.");
    }
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-zinc-800
            bg-zinc-900/80
            text-zinc-400
            transition-all duration-200
            hover:border-zinc-700
            hover:bg-zinc-800
            hover:text-white
            active:scale-95
          "
          >
            <FiMenu size={20} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48  text-zinc-200">
          <DropdownMenuGroup>
            <Item text="Compartilhar" icon={<FaShare />} />
            <Item text="ID" icon={<HiOutlineDotsHorizontal />} />
            {isOwner && <Item text="Editar" icon={<FaEdit />} onClick={() =>
              setEditMode(true)} />}

          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={editMode} onOpenChange={setEditMode}>
        <CreatePost
          onSubmit={handleSubmit(onSubmit)}
          setValue={setValue}
          watch={watch}
          register={register}
          reset={reset}
          errors={errors}
          EhEdit={true} />
      </Dialog >
    </>
  );
}
