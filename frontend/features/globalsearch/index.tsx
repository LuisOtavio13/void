"use client";

import { useEffect, useState } from "react";
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
import { search } from "./services/service";

type SearchType = "USER" | "PROJECT";

type SearchResult = {
  type: SearchType;
  id: number;
  name: string;
  avatarUrl?: string;
};

const skeletonItems = Array.from({ length: 4 }, (_, index) => index);

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 350);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const term = debouncedQuery.trim();

    if (!term) {
      setResults([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    setLoading(true);

    search(term)
      .then((data: SearchResult[]) => {
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
  }, [debouncedQuery]);

  const hasQuery = debouncedQuery.trim().length > 0;

  return (
    <Command className="w-full rounded-2xl border bg-background shadow-sm">
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Pesquisar usuários ou projetos..."
      />

      <CommandList>
        {!hasQuery && (
          <CommandEmpty>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <PiEmptyLight />
                </EmptyMedia>
                <EmptyTitle>Digite para buscar</EmptyTitle>
                <EmptyDescription>
                  Procure por usuários ou projetos pelo nome.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CommandEmpty>
        )}

        {loading && hasQuery && (
          <CommandGroup>
            {skeletonItems.map((item) => (
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
          <CommandEmpty>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <PiEmptyLight />
                </EmptyMedia>
                <EmptyTitle>Nenhum resultado encontrado</EmptyTitle>
                <EmptyDescription>
                  Não encontramos nenhum usuário ou projeto com esse nome.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CommandEmpty>
        )}

        {!loading && results.length > 0 && (
          <CommandGroup>
            {results.map((result) => (
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
                  ) }

                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {result.type === "USER" ? "Usuário" : "Projeto"}
                    </p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}