import { useCallback, useRef, useState } from "react";
import { CardItem } from "../types/types";
import { fetchCards } from "../services/fetch-cards";

interface Props {
  initialCards: CardItem[];
  jwt: string;
}

export function useCards({ initialCards, jwt }: Props) {
  const [cards, setCards] = useState<CardItem[]>(initialCards);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialCards.length > 0);

  const pageRef = useRef(initialCards.length > 0 ? 1 : 0);
  const loadingRef = useRef(false);

  const loadCards = useCallback(async () => {
    if (!jwt || loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const nextPage = pageRef.current;
      const newCards = await fetchCards(nextPage, jwt);

      if (newCards.length === 0) {
        setHasMore(false);
      } else {
        setCards((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const filtered = newCards.filter((c) => !existingIds.has(c.id));
          return [...prev, ...filtered];
        });
        pageRef.current = nextPage + 1;
      }
    } catch (err) {
      console.error(err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [jwt, hasMore]);

  return { cards, loading, loadCards, hasMore };
}
