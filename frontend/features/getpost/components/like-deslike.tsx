"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { desLike, likePut } from "../services/get-post";
import { getUser } from "@/shared/context/user";
import { useQuery } from "@tanstack/react-query";

interface LikeDislikeProps {
  initialLikes?: number;
  initialDislikes?: number;
  readOnly?: boolean;
  liked: boolean;
  disliked: boolean;
  jwt?: string;
  id: number;
  sla: boolean
}

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(".0", "")}k` : String(n);
}

export function LikeDislike({
  initialLikes = 0,
  initialDislikes = 0,
  readOnly = false,
  id,
  jwt,
  liked,
  disliked,
  sla
}: LikeDislikeProps) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const currentJwt = jwt ?? user?.jwt;
  const isGuest = !currentJwt || currentJwt === "-1";

  const [isLiked, setIsLiked] = useState(liked);
  const [isDisliked, setIsDisliked] = useState(disliked);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  useEffect(() => {
    setIsLiked(liked);
    setIsDisliked(disliked);
    setLikes(initialLikes);
    setDislikes(initialDislikes);
  }, [liked, disliked, initialLikes, initialDislikes]);

  function requestLogin() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:login-required"));
    }
  }

  function handleLike() {
    if (readOnly) return;

    if (isGuest) {
      requestLogin();
      return;
    }

    if (isDisliked) {
      setDislikes((d) => d - 1);
      setIsDisliked(false);
    }
    setLikes((l) => (isLiked ? l - 1 : l + 1));
    setIsLiked((v) => !v);
    likePut(id, currentJwt, sla);
  }

  function handleDislike() {
    if (readOnly) return;

    if (isGuest) {
      requestLogin();
      return;
    }

    if (isLiked) {
      setLikes((l) => l - 1);
      setIsLiked(false);
    }
    setDislikes((d) => (isDisliked ? d - 1 : d + 1));
    setIsDisliked((v) => !v);
    desLike(id, currentJwt, sla);
  }

  return (
    <div className="space-y-2">
      {!readOnly && isGuest && (
        <div className="flex items-center justify-between gap-3 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
          <span>Entre para curtir, avaliar e interagir com os projetos.</span>
          <Link href="/login" className="font-semibold text-amber-200 underline-offset-2 hover:underline">
            Fazer login
          </Link>
        </div>
      )}

      <div
        className={`flex items-center gap-1 w-fit ${
          sla ? "bg-white/5 border border-white/10 rounded-md p-0.5" : ""
        }`}
      >
        <button
          type="button"
          onClick={handleLike}
          aria-pressed={isLiked}
          disabled={readOnly}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors text-neutral-300 ${
            readOnly ? "cursor-default opacity-70" : "hover:bg-white/10"
          }`}
        >
          {isLiked ? <AiFillLike size={13} /> : <AiOutlineLike size={13} />}
          <span className="text-xs font-medium">{formatCount(likes)}</span>
        </button>

        <div className={sla ? "w-px h-3 bg-white/10" : "hidden"}></div>

        <button
          type="button"
          onClick={handleDislike}
          aria-pressed={isDisliked}
          disabled={readOnly}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors text-neutral-300 ${
            readOnly ? "cursor-default opacity-70" : "hover:bg-white/10"
          }`}
        >
          {isDisliked ? <AiFillDislike size={13} /> : <AiOutlineDislike size={13} />}
          <span className="text-xs font-medium">{formatCount(dislikes)}</span>
        </button>
      </div>
    </div>
  );
}