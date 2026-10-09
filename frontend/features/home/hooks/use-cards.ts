import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { CardItem } from "../types/types";
import { fetchCards } from "../services/fetch-cards";
import { getUser } from "@/shared/context/user";
import { cardsRealtime } from "../realtime/cards-realtime";

export function useCards() {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(0);
  const loadingRef = useRef(false);

  const jwt = user?.jwt;

  const loadCards = useCallback(async () => {
    if (!jwt||loadingRef.current || !hasMore) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      const currentPage = pageRef.current;

      let newCards = await fetchCards(currentPage, jwt);

      
      if (newCards.length === 0 && currentPage !== 0) {
        pageRef.current = 0;
        newCards = await fetchCards(0, jwt);

        setCards(newCards);
        setHasMore(newCards.length > 0);
        pageRef.current = 1;

        return;
      }

      if (newCards.length === 0) {
        setHasMore(false);
        return;
      }

      setCards((prev) => [...prev, ...newCards]);

      pageRef.current = currentPage + 1;
    } catch (err) {
      console.error("Erro ao carregar cards:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [jwt, hasMore]);

  useEffect(() => {
    if(!jwt){return}
    return cardsRealtime({
      setCards,
    });
  }, [jwt]);

  return {
    cards,
    loading: userLoading || loading,
    loadCards,
    pageRef,
    hasMore,
  };
}