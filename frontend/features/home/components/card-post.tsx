import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { User } from "@/shared/types/UserType";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

export function CardPost({
  children,
  hasHover,
}: {
  children: React.ReactNode;
  hasHover?: boolean;
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-primary/20 text-zinc-100",
        hasHover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl",
      )}
    >
      {children}
    </Card>
  );
}
export function CardPostHeader({ children }: { children: React.ReactNode }) {
  return <CardHeader className="space-y-4">{children}</CardHeader>;
}
export function CardPostBody({ children }: { children: React.ReactNode }) {
  return <CardContent className="space-y-3">{children}</CardContent>;
}
export function CardPostFooter({ children }: { children: React.ReactNode }) {
  return (
    <CardFooter className="flex items-center gap-2 pt-2">{children}</CardFooter>
  );
}
export function UserAvatar({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={user.photo} />

      <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

export function CardTags({ tags, cores }: { tags: string[]; cores: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            cores[index % cores.length]
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
export function CardPostButton({
  isActive,
  href,
  icon,
  title,
}: {
  isActive: boolean;
  href: string;
  icon: React.ReactNode;
  title: string;
}) {
  if (!isActive) return null;
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
    >
      {icon}
      {title}
    </Link>
  );
}
export function UserInfo({ user }: { user: User }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="font-medium">{user.name}</p>
        {user.isAdmin && <MdVerified className="text-primary" />}
      </div>

      <p className="text-sm text-zinc-400">
        @{user.name.toLowerCase().replace(/\s/g, "")}
      </p>
    </div>
  );
}
export function UserPopover({ user }: { user: User }) {
  return (
    <div
      className="
        pointer-events-none
        absolute
        left-0
        top-14
        z-50
        w-72
        translate-y-2
        rounded-2xl
        border border-zinc-700
        bg-background
        p-4
        opacity-0
        transition-all
        duration-200
        group-hover:opacity-100
      "
    >
      <div className="flex items-center gap-3">
        <UserAvatar user={user} className="h-14 w-14" />

        <UserInfo user={user} />
      </div>

      {user.description && (
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          {user.description}
        </p>
      )}
    </div>
  );
}
export function CardPostSkeleton() {
  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-md" />
        </div>

        <Skeleton className="h-5 w-2/3 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-3 w-5/6 rounded-md" />

        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
CardPost.Skeleton = CardPostSkeleton;
CardPost.Header = CardPostHeader;
CardPost.Body = CardPostBody;
CardPost.Footer = CardPostFooter;
CardPost.Button = CardPostButton;
