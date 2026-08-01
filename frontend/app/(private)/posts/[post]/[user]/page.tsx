import { GetPosts } from "@/features/getpost/get-posts";
import { getPost } from "@/features/getpost/services/get-post";

import type { Metadata } from "next";
export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{
    user: string;
    post: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { user: ownerPost, post } = await params;

  return <GetPosts user={post} post={ownerPost} />;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { post } = await params;
  const postData = await getPost(Number(post));

  if (!postData) return {};

  const title = postData.title;
  const description = postData.description?.slice(0, 150);
  const authorName = postData.user?.name ?? "Autor desconhecido";

  const ogImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(
    title,
  )}&author=${encodeURIComponent(authorName)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
