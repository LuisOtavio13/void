import { User } from "@/shared/types/UserType";

interface Post {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
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
