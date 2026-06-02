"use client";

import { useState } from "react";

import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { X } from "lucide-react";

import Link from "next/link";
import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CreatePostSchema } from "@/shared/schema/create-post";
import { MD } from "./MD";

interface CreatePostProps {
  setValue: UseFormSetValue<CreatePostSchema>;
  watch: UseFormWatch<CreatePostSchema>;
  register: UseFormRegister<CreatePostSchema>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  reset: UseFormReset<CreatePostSchema>;
  errors: FieldErrors<CreatePostSchema>;
}

export function CreatePost({
  onSubmit,
  setValue,
  watch,
  errors,
  register,
  reset,
}: CreatePostProps) {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const title = watch("title");
  const content = watch("content");
  const githubUrl = watch("githubUrl");
  const demoUrl = watch("demoUrl");

  function addTag() {
    const tag = tagInput.trim().toLowerCase();

    if (tag && !tags.includes(tag)) {
      const updatedTags = [...tags, tag];

      setTags(updatedTags);
      setValue("tags", updatedTags);
      setTagInput("");
    }
  }
  function removeTag(tag: string) {
    const updatedTags = tags.filter((t) => t !== tag);

    setTags(updatedTags);
    setValue("tags", updatedTags);
  }
  const cores: string[] = [
    "bg-pink-700 text-white",
    "bg-blue-700 text-white",
    "bg-green-700 text-white",
    "bg-yellow-700 text-white",
    "bg-red-700 text-white",
    "bg-purple-700 text-white",
  ];
  function handleReset() {
    reset();
    setTags([]);
    setTagInput("");
  }
  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-3xl">
      <form onSubmit={onSubmit}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Criar postagem
          </DialogTitle>

          <p className="text-sm text-zinc-400">
            Compartilhe seu projeto com a comunidade.
          </p>
        </DialogHeader>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Título
              </label>

              <Input
                placeholder="Meu projeto incrível..."
                {...register("title")}
                className="border-zinc-800 bg-zinc-900"
              />
              {errors.title && (
                <span className="text-sm text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Conteúdo
              </label>

              <Textarea
                placeholder="Fale um pouco sobre o seu projeto..."
                {...register("content")}
                className="min-h-[180px] resize-none border-zinc-800 bg-zinc-900"
              />
              {errors.content && (
                <span className="text-sm text-red-500">
                  {errors.content.message}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-300">Tags</label>

              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  placeholder="react, nextjs..."
                  className="border-zinc-800 bg-zinc-900"
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                {errors.tags && (
                  <span className="text-sm text-red-500">
                    {errors.tags.message}
                  </span>
                )}
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={tag}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                        cores[index % cores.length]
                      }`}
                    >
                      {tag}

                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="opacity-70 transition hover:opacity-100 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                GitHub Link
              </label>

              <Input
                {...register("githubUrl")}
                placeholder="https://github.com/..."
                className="border-zinc-800 bg-zinc-900"
              />
              {errors.githubUrl && (
                <span className="text-sm text-red-500">
                  {errors.githubUrl.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Link de demonstração
              </label>

              <Input
                {...register("demoUrl")}
                placeholder="https://..."
                className="border-zinc-800 bg-zinc-900"
              />
              {errors.demoUrl && (
                <span className="text-sm text-red-500">
                  {errors.demoUrl.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-400">Preview</p>

            <Card className="overflow-hidden border-zinc-800 bg-zinc-900 text-zinc-100">
              <CardHeader className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">
                  {title || "Título da sua postagem"}
                </h2>
              </CardHeader>

              <CardContent className="space-y-3">
                <MD md={content || "Visualização do seu conteúdo..."} />

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        cores[index % cores.length]
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <CardFooter className="flex items-center gap-2 px-0 pt-2">
                  {githubUrl && (
                    <Link
                      href={githubUrl}
                      target="_blank"
                      className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                    >
                      <FaGithub />
                      GitHub
                    </Link>
                  )}

                  {demoUrl && (
                    <Link
                      href={demoUrl}
                      target="_blank"
                      className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                    >
                      <FiExternalLink />
                      Ver demo
                    </Link>
                  )}
                </CardFooter>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-zinc-800 bg-transparent hover:bg-zinc-900"
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            disabled={!title || !content}
            type="submit"
            className="bg-white text-black hover:bg-zinc-200"
          >
            Criar post
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
