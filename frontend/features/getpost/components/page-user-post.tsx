import { DropDownPost } from "@/shared/components/posts/drop-down";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import Link from "next/link";

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10">
      {children}
    </header>
  );
}
export function PageTitle({
  title,
  ownerPost,
}: {
  title: string;
  ownerPost: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h1 className="text-4xl font-bold tracking-tight text-white">{title}</h1>
      <DropDownPost userID={Number(ownerPost)} />
    </div>
  );
}
export function UserDatails({
  photo,
  name,
  createdAt,
}: {
  photo: string;
  name: string;
  createdAt: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-zinc-400">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={photo} alt={name} />
          <AvatarFallback>{name.substring(0, 3).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span>{name}</span>
      </div>
      <span>•</span>
      <span>{new Date(createdAt).toLocaleDateString("pt-BR")}</span>
    </div>
  );
}
export function PageBreadcrumb({
  name,
  title,
  ownerPost,
  post,
}: {
  name: string;
  title: string;
  ownerPost: string;
  post: string;
}) {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/pages/home">home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={`/${ownerPost}`}>{name}</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={`/${ownerPost}/${post}`}>{title}</Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
