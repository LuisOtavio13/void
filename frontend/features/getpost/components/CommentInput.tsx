"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImageIcon, Send } from "lucide-react";
import { toast } from "sonner";

import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { uploadImage } from "@/shared/services/upload-image-service";

export interface CommentFormData {
  content: string;
}

interface CommentInputProps {
  onSubmit: (data: CommentFormData) => Promise<void>;
  disabled?: boolean;
}

export function CommentInput({
  onSubmit,
  disabled = false,
}: CommentInputProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<CommentFormData>({
    defaultValues: {
      content: "",
    },
  });

  const content = watch("content");

  async function handlePasteImage(
    e: React.ClipboardEvent<HTMLTextAreaElement>
  ) {
    const items = e.clipboardData?.items;

    if (!items) return;

    const imageItem = Array.from(items).find((item) =>
      item.type.startsWith("image/")
    );

    if (!imageItem) return;

    e.preventDefault();

    const file = imageItem.getAsFile();

    if (!file) return;

    setUploadingImage(true);

    try {
      const url = await uploadImage(file);

      const markdownImage = `![imagem](${url})`;

      const current = content || "";

      setValue(
        "content",
        current
          ? `${current}\n${markdownImage}\n`
          : `${markdownImage}\n`,
        {
          shouldDirty: true,
        }
      );
    } catch {
      toast.error("Erro ao enviar a imagem");
    } finally {
      setUploadingImage(false);
    }
  }

  async function submit(data: CommentFormData) {
    if (!data.content.trim()) return;

    try {
      setSending(true);

      await onSubmit({
        content: data.content.trim(),
      });

      reset();
    } catch {
      // O componente pai pode tratar o erro
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(submit)();
    }
  }

  const isDisabled =
    disabled ||
    sending ||
    uploadingImage;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mb-7"
    >
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        <Textarea
          {...register("content")}
          placeholder="O que achou deste projeto?"
          disabled={isDisabled}
          onPaste={handlePasteImage}
          onKeyDown={handleKeyDown}
          maxLength={2000}
          className="
            min-h-[120px]
            resize-none
            border-0
            bg-transparent
            shadow-none
            focus-visible:ring-0
          "
        />

        <div className="flex items-center justify-between border-t border-zinc-800 px-3 py-2">
          <div className="flex items-center gap-2">
            <ImageIcon
              size={15}
              className="text-zinc-500"
            />

            <span className="text-xs text-zinc-500">
              {uploadingImage
                ? "Enviando imagem..."
                : "Cole uma imagem diretamente"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">
              {content?.length ?? 0}/2000
            </span>

            <Button
              type="submit"
              size="sm"
              disabled={
                isDisabled ||
                !content?.trim()
              }
              className="gap-2"
            >
              <Send size={14} />

              {sending
                ? "Enviando..."
                : "Comentar"}
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-2 text-xs text-zinc-500">
        Ctrl + Enter para enviar
      </p>
    </form>
  );
}