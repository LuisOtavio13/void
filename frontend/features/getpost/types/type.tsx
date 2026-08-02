import { User } from "@/shared/types/UserType";
import { boolean } from "zod";

interface Post {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  likesCount : number;
  desLikesCount : number;
  isLikedByUser: boolean;
  isDesLikedByUser: boolean;
  thisUserIsOwner: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}
interface PostPage {
  user: string;
  post: string;
}
export type { Post, PostPage };
