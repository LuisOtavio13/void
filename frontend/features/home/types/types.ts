import { User } from "@/shared/types/UserType";

export interface CardItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  likesCount: number;
  desLikesCount: number;
  isLikedByUser: boolean;
  isDesLikedByUser: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
