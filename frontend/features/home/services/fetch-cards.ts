import type { CardItem } from "../types/types";

function mapCardItem(item: any): CardItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image,
    tags: item.tags,
    githubLink: item.githubLink,
    demoLink: item.demoLink,
    likesCount: item.likesCount,
    desLikesCount: item.desLikesCount,
    isLikedByUser: item.isLikedByUser,
    isDesLikedByUser: item.isDesLikedByUser,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    user: {
      isAdmin: item.user.isAdmin,
      id: item.user.id,
      name: item.user.name,
      email: item.user.email ?? "",
      avatar_url: item.user.avatar_url ?? item.user.avatar ?? "",
      createdAt: item.user.createdAt,
      description: item.user.description,
      isVerified: item.user.isVerified,
    },
  };
}

async function fetchCards(
  page: number,
  jwt: string | undefined,
): Promise<CardItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}posts?page=${page}`,
    {
      headers: {
        ...(jwt && jwt !== "-1" ? { Authorization: `Bearer ${jwt}` } : {}),
      },
    },
  );

  const body = await res.json().catch(() => ({}));
  const items = Array.isArray(body?.content)
    ? body.content
    : Array.isArray(body)
      ? body
      : [];

  return items.map(mapCardItem);
}

export { fetchCards };
