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
export function CardTags({ tags, cores }: { tags: string[]; cores: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            cores[index % cores.length]
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
