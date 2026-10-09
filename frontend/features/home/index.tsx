"use client";
import {
  CardPost,
} from "@/features/home/components/card-post";
import { useCards } from "@/features/home/hooks/use-cards";
import { useInfiniteScroll } from "@/features/home/hooks/use-infinite-scroll";
import { HOME_CARD_COLORS, HOME_SKELETON_COUNT } from "./constants";
import { Card } from "./components/card";

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
        <Card cards={cards}/>

        
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
