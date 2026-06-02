"use client";
import { useState } from "react";

export function CardPostDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <p
      onClick={() => setExpanded((v) => !v)}
      className="cursor-pointer text-sm leading-relaxed text-zinc-400"
    >
      {expanded ? description : description.slice(0, 80) + "..."}
    </p>
  );
}
