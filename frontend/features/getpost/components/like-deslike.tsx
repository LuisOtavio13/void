"use client";

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
}: LikeDislikeProps) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const currentJwt = jwt ?? user?.jwt;

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

  function handleLike() {
    if (readOnly || !currentJwt) return;

    if (isDisliked) {
      setDislikes((d) => d - 1);
      setIsDisliked(false);
    }
    setLikes((l) => (isLiked ? l - 1 : l + 1));
    setIsLiked((v) => !v);
    likePut(id, currentJwt);
  }

  function handleDislike() {
    if (readOnly || !currentJwt) return;

    if (isLiked) {
      setLikes((l) => l - 1);
      setIsLiked(false);
    }
    setDislikes((d) => (isDisliked ? d - 1 : d + 1));
    setIsDisliked((v) => !v);
    desLike(id, currentJwt);
  }

  return (
    <div
      className={`flex items-center gap-1 w-fit ${
        readOnly ? "" : "bg-white/5 border border-white/10 rounded-md p-0.5"
      }`}
    >
      <button
        type="button"
        onClick={handleLike}
        aria-pressed={isLiked}
        disabled={readOnly}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors text-neutral-300 ${
          readOnly ? "cursor-default" : "hover:bg-white/10"
        }`}
      >
        {isLiked ? <AiFillLike size={13} /> : <AiOutlineLike size={13} />}
        <span className="text-xs font-medium">{formatCount(likes)}</span>
      </button>

      <div className={readOnly ? "hidden" : "w-px h-3 bg-white/10"} />

      <button
        type="button"
        onClick={handleDislike}
        aria-pressed={isDisliked}
        disabled={readOnly}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors text-neutral-300 ${
          readOnly ? "cursor-default" : "hover:bg-white/10"
        }`}
      >
        {isDisliked ? <AiFillDislike size={13} /> : <AiOutlineDislike size={13} />}
        <span className="text-xs font-medium">{formatCount(dislikes)}</span>
      </button>
    </div>
  );
}