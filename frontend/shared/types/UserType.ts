export interface User {
  isAdmin: boolean;
  name: string;
  email: string;
  jwt?: string;
  avatar_url: string;
  createdAt?: string;
  id?: number;
  isVerified?: boolean;
  description?: string;
}
