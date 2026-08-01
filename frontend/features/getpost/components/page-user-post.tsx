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
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  content,
  tags,
  demoUrl,
  id,
  githubUrl,
}: {
  title: string;
  ownerPost: string;
  content: string;
  tags?: string[];
  demoUrl?: string;
  githubUrl?: string;
  id: number;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h1 className="text-4xl font-bold tracking-tight text-white">{title}</h1>
      <DropDownPost
        userID={Number(ownerPost)}
        title={title}
        content={content}
        tags={tags}
        id={id}
        demoUrl={demoUrl}
        githubUrl={githubUrl}
      />
    </div>
  );
}
export function UserDatails({
  photo,
  name,
  createdAt,
  updatedAt,
}: {
  photo: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}) {
  const dataCriacao = parseISO(createdAt);
  const dataAtualizacao = parseISO(updatedAt);
  
  
  const isUpdated = (dataAtualizacao.getTime() - dataCriacao.getTime()) > 10000;

  
  const dataAlvo = isUpdated ? dataAtualizacao : dataCriacao;

 
  const dia = String(dataAlvo.getDate()).padStart(2, '0');
  const mes = String(dataAlvo.getMonth() + 1).padStart(2, '0');
  const ano = dataAlvo.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;

  
  const atualizacaoFormatada = isUpdated 
    ? formatDistanceToNow(dataAtualizacao, { addSuffix: true, locale: ptBR }) 
    : null;

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
      <span className="tabular-nums">
        {dataFormatada}
        {atualizacaoFormatada && ` • Atualizado ${atualizacaoFormatada}`}
      </span>
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
