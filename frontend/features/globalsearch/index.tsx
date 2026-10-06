"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { PiEmptyLight } from "react-icons/pi";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { EMPTY_SEARCH_MESSAGES, SEARCH_SKELETON_ITEMS } from "./constants";
import { search } from "./services/service";
import type { SearchResult } from "./types";

function EmptySearchState({ title, description }: { title: string; description: string }) {
  return (
    <CommandEmpty>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PiEmptyLight />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </CommandEmpty>
  );
}

function SearchResultItem({ result }: { result: SearchResult }) {
  return (
    <CommandItem
      key={`${result.type}-${result.id}`}
      value={`${result.type}-${result.name}`}
      className="flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-3">
        {result.type === "USER" && (
          <Avatar size="sm">
            <AvatarImage src={result.avatarUrl} alt={result.name} />
            <AvatarFallback>{result.name.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}

        <div>
          <p className="font-medium">{result.name}</p>
          <p className="text-xs text-muted-foreground">
            {result.type === "USER" ? "Usuário" : "Projeto"}
          </p>
        </div>
      </div>
    </CommandItem>
  );
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 350);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const normalizedQuery = useMemo(() => debouncedQuery.trim(), [debouncedQuery]);
  const hasQuery = normalizedQuery.length > 0;

  useEffect(() => {
    if (!hasQuery) {
      setResults([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    setLoading(true);

    search(normalizedQuery)
      .then((data) => {
        if (!isMounted) return;
        setResults(data);
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setResults([]);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [hasQuery, normalizedQuery]);

  return (
    <Command className="w-full rounded-2xl border bg-background shadow-sm">
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Pesquisar usuários ou projetos..."
      />

      <CommandList>
        {!hasQuery && (
          <EmptySearchState
            title={EMPTY_SEARCH_MESSAGES.idle.title}
            description={EMPTY_SEARCH_MESSAGES.idle.description}
          />
        )}

        {loading && hasQuery && (
          <CommandGroup>
            {SEARCH_SKELETON_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-sm px-2 py-2">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
              </div>
            ))}
          </CommandGroup>
        )}

        {!loading && hasQuery && results.length === 0 && (
          <EmptySearchState
            title={EMPTY_SEARCH_MESSAGES.empty.title}
            description={EMPTY_SEARCH_MESSAGES.empty.description}
          />
        )}

        {!loading && results.length > 0 && (
          <CommandGroup>
            {results.map((result) => (
              <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}