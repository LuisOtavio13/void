import { User } from "@/shared/types/UserType";

interface CardItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
export type { CardItem };
