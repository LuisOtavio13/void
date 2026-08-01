
import { useCallback, useEffect, useRef, useState } from "react";
import { CardItem } from "../types/types";
import { fetchCards } from "../services/fetch-cards";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/shared/context/user";

export function useCards() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadingRef = useRef(false);
  const pageRef = useRef(0);
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
    let cancelled = false;

    async function init() {
      loadingRef.current = true;
      setLoading(true);

      try {
        const data = await fetchCards(0, jwt!);

        if (!cancelled) {
          setCards(data);
          setPage(1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) {
          setLoading(false);
          loadingRef.current = false;
        }
      }
    }
    init();
    return () => {
      cancelled = true;
    };
  }, [jwt]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  return { cards, loading, loadCards, pageRef, hasMore };
}
