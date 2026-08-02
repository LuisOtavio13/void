import { User } from "@/shared/types/UserType";
import { boolean } from "zod";

interface CardItem {
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
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
export type { CardItem };
