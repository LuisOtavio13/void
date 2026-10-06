"use client";
import { CardTitle } from "@/shared/components/ui/card";
import {
  CardPost,
  UserInfo,
  UserPopover,
} from "@/features/home/components/card-post";
import { useCards } from "@/features/home/hooks/use-cards";
import { useInfiniteScroll } from "@/features/home/hooks/use-infinite-scroll";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { CardPostDescription, CardTags } from "./components/client";
import { HOME_CARD_COLORS, HOME_SKELETON_COUNT } from "./constants";
import { LikeDislike } from "../getpost/components/like-deslike";

export const cores = HOME_CARD_COLORS;

export function HomePageIndex() {
  const { cards, loading, loadCards, hasMore } = useCards();

  const loadingRef = useInfiniteScroll(() => {
    if (hasMore && !loading) {
      loadCards();
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

              <CardTitle className="cursor-pointer text-xl font-bold tracking-tight hover:underline">
                <Link href={`/posts/${card.user.id}/${card.id}`}>
                  {card.title}
                </Link>
              </CardTitle>
            </CardPost.Header>

            <CardPost.Body>
              <CardPostDescription description={card.description} />
              <CardTags tags={card.tags} cores={HOME_CARD_COLORS} />

              <LikeDislike
                readOnly
                id={card.id}
                initialLikes={card.likesCount}
                liked={card.isLikedByUser}
                disliked={card.isDesLikedByUser}
                initialDislikes={card.desLikesCount}
                sla={false}
              />
            </CardPost.Body>

            {(card.githubLink || card.demoLink) && (
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
            {Array.from({ length: HOME_SKELETON_COUNT }, (_, index) => (
              <CardPost.Skeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
