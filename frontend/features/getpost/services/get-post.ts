import { Post } from "../types/type";

export async function getPost(id: number, jwt : string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}posts/${id}`,
      { cache: "no-cache", headers:{
        "Authorization":`Bearer ${jwt}`
      }},
    );
    if (!response.ok) {
        console.log("Status não ok:", response.status);
      return null};
    return await response.json();
  } catch {
    return null;
  }
}
export async function likePut(id: number, jwt : string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}posts/likes/${id}`,
      { 
        method: "PUT",
        cache: "no-cache",
        headers:{
        "Authorization":`Bearer ${jwt}`
      }},
    );
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
export async function desLike(id: number, jwt : string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}posts/likes/${id}`,
      { 
        method: "DELETE",
        cache: "no-cache",
        headers:{
        "Authorization":`Bearer ${jwt}`
      }},
    );
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
