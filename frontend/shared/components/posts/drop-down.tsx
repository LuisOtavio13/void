"use client";
import { FiMenu, FiShare } from "react-icons/fi";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaShare } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/shared/context/user";
function Item({ text, icon }: { text: string; icon: React.ReactNode }) {
  return (
    <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
      {icon}
      {text}
    </DropdownMenuItem>
  );
}
export function DropDownPost({ userID }: { userID: number }) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const isOwner = user?.id === userID;
  console.log(isOwner + " " + userID + " " + user?.id);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-zinc-800
            bg-zinc-900/80
            text-zinc-400
            transition-all duration-200
            hover:border-zinc-700
            hover:bg-zinc-800
            hover:text-white
            active:scale-95
          "
        >
          <FiMenu size={20} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48  text-zinc-200">
        <DropdownMenuGroup>
          <Item text="Compartilhar" icon={<FaShare />} />
          <Item text="ID" icon={<HiOutlineDotsHorizontal />} />
          {isOwner && <Item text="Editar" icon={<FaEdit />} />}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
