"use client";
import { CardTitle } from "@/shared/components/ui/card";
import {
  CardPost,
  CardTags,
  UserInfo,
  UserPopover,
} from "@/features/home/components/card-post";
import { useCards } from "@/features/home/hooks/use-cards";
import { useInfiniteScroll } from "@/features/home/hooks/use-infinite-scroll";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { CardPostDescription } from "./components/client";

const cores: string[] = [
  "bg-pink-700 text-white",
  "bg-blue-700 text-white",
  "bg-green-700 text-white",
  "bg-yellow-700 text-white",
  "bg-red-700 text-white",
  "bg-purple-700 text-white",
];

export function HomePageIndex() {
  const { cards, loading, loadCards, pageRef, hasMore } = useCards();
  const loadingRef = useInfiniteScroll(() => {
      if(hasMore){
        loadCards(pageRef.current);
      }
  });

  return (
    <div className="min-h-screen p-6">
      <div className="mx-10 flex flex-col gap-6">
        {cards.map((card, index) => (
          <CardPost key={`${card.id}-${index}`}>
            <CardPost.Header>
              <div className="group relative flex items-center gap-3">
                <UserInfo user={card.user} />

                <UserPopover user={card.user} />
              </div>

              <CardTitle className="text-xl font-bold tracking-tight cursor-pointer hover:underline">
                <Link href={`/posts/${card.user.id}/${card.id}`}>{card.title}</Link>
              </CardTitle>
            </CardPost.Header>
            <CardPost.Body>
              <CardPostDescription description={card.description} />
              <CardTags tags={card.tags} cores={cores} />
            </CardPost.Body>
            { (card.githubLink || card.demoLink) && (
            <CardPost.Footer>
              <CardPost.Button
                isActive={!!card.githubLink}
                href={card.githubLink ?? ""}
                icon={<FaGithub />}
                title="GitHub"
              />
              <CardPost.Button
                isActive={!!card.demoLink}
                href={card.demoLink ?? ""}
                icon={<FiExternalLink />}
                title="Ver demo"
              />
            </CardPost.Footer>
            )}
          </CardPost>
        ))}

        <div ref={loadingRef} className="h-10" />

        {loading && (
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <CardPost.Skeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
