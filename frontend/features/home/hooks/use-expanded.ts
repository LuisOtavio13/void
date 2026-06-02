import { useState } from "react";

export function useExpanded() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const toggle = (index: number) =>
    setExpanded((prev) => (prev === index ? null : index));
  return { expanded, toggle };
}
