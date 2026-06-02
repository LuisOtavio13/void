import { Post } from "../types/type";

export async function getPost(id: number): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}posts/${id}`,
      { cache: "no-cache" },
    );
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
