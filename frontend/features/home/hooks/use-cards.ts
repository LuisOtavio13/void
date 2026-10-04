
import { useCallback, useEffect, useRef, useState } from "react";
import { CardItem } from "../types/types";
import { fetchCards } from "../services/fetch-cards";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/shared/context/user";
import { subscribeToPosts } from "../services/subscribeToPosts";
import { toast } from "sonner";

export function useCards() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [cards, setCards] = useState<CardItem[]>([]);
  const [loadingA, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadingRef = useRef(false);
  const pageRef = useRef(0);
  const subscriptionRef = useRef<(() => void) | null>(null);
  const jwt = user?.jwt;

  const loadCards = useCallback(
    async (currentPage: number) => {
      if (!jwt || loadingRef.current) return;

      loadingRef.current = true;
      setLoading(true);

      try {
        let newCards = await fetchCards(currentPage, jwt);
        let NextPageToFetch = currentPage;
        if (newCards.length === 0) {
          NextPageToFetch = 0;
          newCards = await fetchCards(0, jwt);
        }

        const PAGE_LIMIT = 3;
        const pageSize = newCards.length;

        setCards((prev) => [...prev, ...newCards]);
        setHasMore(pageSize > 0);
        setPage(NextPageToFetch + 1);
      } catch (err) {
        console.error(err);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [hasMore, jwt],
  );
  useEffect(() => {
    if (!jwt) return;

    if (subscriptionRef.current) {
      subscriptionRef.current();
      subscriptionRef.current = null;
    }

    const unsubscribe = subscribeToPosts((newPost: CardItem) => {
      setCards((prev) => {
        if (prev.some((card) => card.id === newPost.id)) {
          return prev;
        }

        toast.success("Novo post publicado!");
        return [newPost, ...prev];
      });
    });

    subscriptionRef.current = unsubscribe;

    return () => {
      unsubscribe();

      if (subscriptionRef.current === unsubscribe) {
        subscriptionRef.current = null;
      }
    };
  }, [jwt]);

  

  useEffect(() => {
    pageRef.current = page;
  }, [page]);
  const loading = isLoading || loadingA;
  return { cards, loading, loadCards, pageRef, hasMore };
}
