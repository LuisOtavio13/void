"use client";
import { CardTitle } from "@/shared/components/ui/card";
import {
  CardPost,
  CardTags,
  UserInfo,
} from "@/features/home/components/card-post";
import { useCards } from "@/features/home/hooks/use-cards";
import { useInfiniteScroll } from "@/features/home/hooks/use-infinite-scroll";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { CardPostDescription } from "./components/client";
import { CardItem } from "./types/types";
import dynamic from "next/dynamic";
const UserPopoverLazy = dynamic(
  () =>
    import("@/features/home/components/card-post").then(
      (mod) => mod.UserPopover,
    ),
  { ssr: false },
);
const COLORS: string[] = [
  "bg-pink-700 text-white",
  "bg-blue-700 text-white",
  "bg-green-700 text-white",
  "bg-yellow-700 text-white",
  "bg-red-700 text-white",
  "bg-purple-700 text-white",
];
interface Props {
  initialCards: CardItem[];
  jwt: string;
}
export function HomePageIndex({ initialCards, jwt }: Props) {
  const { cards, loading, loadCards, hasMore } = useCards({
    initialCards,
    jwt,
  });
  const loadingRef = useInfiniteScroll(loadCards, {
    enabled: !loading && hasMore,
  });

  return (
    <div className="min-h-screen p-6">
      <div className="mx-10 flex flex-col gap-6">
        {cards.map((card, index) => (
          <CardPost key={index}>
            <CardPost.Header>
              <div className="group relative flex items-center gap-3">
                <UserInfo user={card.user} />

                <UserPopoverLazy user={card.user} />
              </div>

              <CardTitle className="text-xl font-bold tracking-tight cursor-pointer hover:underline">
                <Link href={`/${card.user.id}/${card.id}`}>{card.title}</Link>
              </CardTitle>
            </CardPost.Header>
            <CardPost.Body>
              <CardPostDescription description={card.description} />
              <CardTags tags={card.tags} cores={COLORS} />
            </CardPost.Body>

            <CardPost.Footer>
              <CardPost.Button
                isActive={card.githubLink !== undefined}
                href={card.githubLink ?? ""}
                icon={<FaGithub />}
                title="GitHub"
              />
              <CardPost.Button
                isActive={card.demoLink !== undefined}
                href={card.demoLink ?? ""}
                icon={<FiExternalLink />}
                title="Ver demo"
              />
            </CardPost.Footer>
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
