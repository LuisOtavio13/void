import { CardItem } from "../types/types";

async function fetchCards(
  page: number,
  jwt: string | undefined,
): Promise<CardItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}posts?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  if (!res.ok) {
    const text = await res.text();

    console.log(res.status);
    console.log(jwt);
    console.log(text);

    throw new Error(`Erro ${res.status}`);
  }

  const body = await res.json();

  const data: CardItem[] = body.content.map((item: any) => ({
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
      photo: item.user.avatar,
      createdAt: item.user.createdAt,
      description: item.user.description,
      isVerified: item.user.isVerified,
    },
  }));

  return data;
}
export { fetchCards };
