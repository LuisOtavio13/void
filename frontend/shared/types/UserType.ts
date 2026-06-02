export interface User {
  isAdmin: boolean;
  name: string;
  email: string;
  jwt?: string;
  photo: string;
  createdAt?: string;
  id?: number;
  isVerified?: boolean;
  description?: string;
}
