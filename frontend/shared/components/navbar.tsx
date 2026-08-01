"use client";

import { useState } from "react";

import { FaBell, FaCompass, FaHome } from "react-icons/fa";
import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import {
  IoBookmark,
  IoCard,
  IoLogOut,
  IoPerson,
  IoSettings,
  IoSparkles,
} from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { CreatePost } from "./create-post";
import { useForm } from "react-hook-form";
import { createPostSchema } from "@/shared/schema/create-post";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreatePostSchema } from "@/shared/schema/create-post";
import {
  createPostService,
  errCreatePost,
} from "@/shared/services/create-post-service";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { FaTrophy } from "react-icons/fa6";
import { logout } from "@/lib/cookies/cookie";
import { getUser } from "../context/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface HeaderBarItens {
  label: string;
  icon: React.ReactNode;
  ativo: boolean;
  href: string;
  badge?: number;
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
      title: "",
      tags: [],
      demoUrl: "",
      githubUrl: "",
    },
  });
  const items: HeaderBarItens[] = [
    {
      label: "Inicial",
      icon: <FaHome size={18} />,
      ativo: pathname === "/pages/home",
      href: "home",
    },
    {
      label: "Notificações",
      icon: <FaBell size={18} />,
      ativo: pathname === "/pages/notification",
      href: "notification",
      badge: 100,
    },
    {
      label: "Explorar",
      icon: <FaCompass size={18} />,
      ativo: pathname === "/pages/explore",
      href: "explore",
    },
    {
      label: "Ranking",
      icon: <FaTrophy size={18} />,
      ativo: pathname === "/pages/ranking",
      href: "ranking",
    },
  ];

  async function onSubmit(post: CreatePostSchema) {
    const token = user?.jwt;
    if (!token) {
      toast.error("Você precisa estar logado para criar um post.");
      return;
    }
    try {
      const response = await createPostService(post, token);
      if (response.status === 200) {
        toast.success("Post criado com sucesso!");
        router.push("/pages/home");
      }
    } catch (error: unknown) {
      if (error instanceof errCreatePost) toast.error(error.message);
    }
  }
  const [activeCard, setActiveCard] = useState(true);
  const queryClient = useQueryClient();
  const router = useRouter();
  const logoutCliente = async () => {
    await logout();

    queryClient.setQueryData(["user"], null);
    router.push("/login");
  };
  return (
    <>
      <Toaster />
      <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="border-b border-sidebar-border p-5">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold">DevHub</span>

            <span className="text-xs text-muted-foreground">
              social for developers
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4">
          <SidebarMenu className="space-y-2">
            {items.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    className="
                  h-12 rounded-2xl px-4
                  text-muted-foreground
                  transition-all duration-200
                  hover:bg-sidebar-accent
                  hover:text-sidebar-accent-foreground
                  data-[active=true]:bg-primary
                  data-[active=true]:text-primary-foreground
                  cursor-pointer
                "
                    data-active={item.ativo}
                  >
                    <div className="relative">
                      {item.icon}
                      {item.badge && (
                        <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                          {item.badge > 99 ? "99+" : item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-3">
          <Dialog>
            <div className="px-1 py-2">
              <DialogTrigger asChild>
                <button className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer">
                  Criar Post
                </button>
              </DialogTrigger>
              <CreatePost
                register={register}
                watch={watch}
                setValue={setValue}
                onSubmit={handleSubmit(onSubmit)}
                reset={reset}
                errors={errors}
              />
            </div>
          </Dialog>

          {activeCard && (
            <Card
              className="
              relative overflow-hidden

              rounded-3xl
              border-border

              bg-card/80
              backdrop-blur

              shadow-none
            "
            >
              <button
                className="
                absolute right-3 top-3

                flex h-8 w-8 items-center justify-center

                rounded-xl

                text-muted-foreground

                transition-all duration-200

                hover:bg-accent
                hover:text-foreground
              "
                onClick={() => setActiveCard(false)}
              >
                <X size={16} />
              </button>

              <CardHeader className="space-y-4 p-5">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-semibold tracking-tight">
                    Confira nosso GitHub
                  </CardTitle>

                  <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                    Explore o código fonte, acompanhe updates e contribua com o
                    projeto.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardFooter>
                <button
                  className="
                  w-full rounded-2xl

                  border border-primary/20
                  bg-primary/10

                  px-4 py-3

                  text-sm font-semibold
                  text-primary


                  hover:bg-primary
                  hover:text-primary-foreground
                  cursor-pointer
                "
                >
                  Abrir GitHub
                </button>
              </CardFooter>
            </Card>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild id="sidebar-user-dropdown-trigger">
              <SidebarMenuButton
                className="
                h-14 rounded-2xl
                hover:bg-sidebar-accent
              "
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.photo} />

                  <AvatarFallback>
                    {user?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>

                  <AvatarBadge className="bg-primary" />
                </Avatar>

                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-medium">
                    {user?.name}
                  </span>

                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>

                <ChevronsUpDown className="size-4 text-muted-foreground" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="
              w-64 rounded-2xl
              border-border
              bg-popover
              text-popover-foreground
            "
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.photo} />

                    <AvatarFallback>
                      {user?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-2">
                  <IoPerson size={16} />
                  Meu Perfil
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-2">
                  <IoSettings size={16} />
                  Configurações
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-2">
                  <IoBookmark size={16} />
                  Salvos
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem
                onClick={logoutCliente}
                className="gap-2 text-destructive flex items-center"
              >
                <IoLogOut size={16} />
                sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
