import { useUser } from "@/shared/hooks/use-user";
import { useCallback, useEffect, useRef, useState } from "react";
import { CardItem } from "../types/types";
import { fetchCards } from "../services/fetch-cards";

export function useCards() {
  const { user } = useUser();

  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
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
        const newCards = await fetchCards(currentPage, jwt);

        if (newCards.length === 0) {
          setCards([]);
          const firstPage = await fetchCards(0, jwt);
          setCards(firstPage);
          setPage(1);
        } else {
          setCards((prev) => [...prev, ...newCards]);
          setPage(currentPage + 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [jwt],
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

  return { cards, loading, loadCards, pageRef };
}
