"use client";

import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { PiEmptyLight } from "react-icons/pi";

export default function SidebarHeaderBar() {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();

        setModal((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger className="-ml-1" />

      <button
        className="ml-auto rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-all flex items-center gap-2 duration-200 hover:border-primary/40 hover:bg-accent hover:text-foreground active:scale-[0.98]"
        onClick={() => setModal(true)}
      >
        Pesquisar
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={modal} onOpenChange={setModal}>
        <Command>
          <CommandInput placeholder="Pesquisar..." />
          <CommandList>
            <CommandEmpty>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <PiEmptyLight />
                  </EmptyMedia>
                  <EmptyTitle>Nenhum resultado encontrado</EmptyTitle>
                  <EmptyDescription>
                    Não encontramos nenhum usuario ou projeto com esse nome.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </CommandEmpty>
            <CommandGroup>
              <CommandItem>sla</CommandItem>
              <CommandItem>dfgdf</CommandItem>
              <CommandItem>addada</CommandItem>
              <CommandItem>fdhgfghfgh</CommandItem>
              <CommandItem>vbnvbnvbn</CommandItem>
              <CommandItem>sfsfsfsfsfsd</CommandItem>
              <CommandItem>sfsfsdfsdfs</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  );
}
