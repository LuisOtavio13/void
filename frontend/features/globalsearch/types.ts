export type SearchType = "USER" | "PROJECT";

export type SearchResult = {
  type: SearchType;
  id: number;
  name: string;
  avatarUrl?: string;
};
