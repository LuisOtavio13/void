import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { FiMenu } from "react-icons/fi";
import { Item } from "@/shared/components/dropDownItem";
import { FaShare, FaFlag, FaCopy } from "react-icons/fa";
import { UserDTO } from "../types/UserDTO";

interface MetaPerfilProps extends UserDTO {
    loggedUserId?: number;
}
interface ProfileActionsMenuProps {
    isOwner: boolean;
}
export function ProfileHeader({ bannerUrl, avatarUrl, username }: { bannerUrl: string; avatarUrl: string; username: string }) {
    return (
        <div className="w-full">

            <div className="relative w-full h-48 md:h-64 bg-gray-300 overflow-hidden">
                {bannerUrl && (
                    <Image
                        src={bannerUrl}
                        alt="Banner do perfil"
                        fill
                        className="object-cover"
                    />
                )}
            </div>


            <div className="px-6 pb-4 relative flex justify-between items-end">
                <div className="-mt-16 relative z-10">
                    {avatarUrl && avatarUrl !== "" ? (
                        <Image
                            src={avatarUrl}
                            alt={username}
                            width={90}
                            height={90}
                            className="rounded-full border-4 border-gray-900 object-cover bg-gray-800 shadow-lg"
                        />
                    ) : (
                        <div className="w-[90px] h-[90px] rounded-full border-4 border-gray-900 bg-gray-800 text-white text-xl flex items-center justify-center shadow-lg">
                            {username ? username.substring(0, 2).toUpperCase() : "US"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ProfileActionsMenu({ isOwner }: ProfileActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>

                <Button variant="outline" size="icon" >
                    <FiMenu size={18} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 bg-zinc-900 border-zinc-800 text-zinc-200">
                <DropdownMenuGroup>
                    <Item text="Compartilhar" icon={<FaShare />} onClick={() => { }} />
                    {!isOwner && (
                       <Item text="Denunciar" icon={<FaFlag />} onClick={() => { }} />
                    )}

                    <Item text="Copiar ID" icon={<FaCopy />} onClick={() => { }} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function MetaPerfil({ id, name, loggedUserId }: MetaPerfilProps) {
    const isOwner = id === loggedUserId;
    

  

    return (
        <div className="px-6 flex justify-between items-start">

            <div className="mt-4 flex flex-col space-y-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    {name}
                </h1>
                <p className="text-sm text-gray-400 font-medium">
                    @{name ? name.toLowerCase().replace(/\s+/g, "") : "usuario"}
                </p>
            </div>


            <div className="mt-4 flex items-center space-x-2">
                <Button variant={isOwner ? "outline" : "default"}>
                    {isOwner ? "Editar Perfil" : "Seguir"}
                </Button>
                <ProfileActionsMenu isOwner={isOwner} />
            </div>
        </div>
    );
}

export function BiographyUser({ biography }: { biography?: string }) {
    if (!biography) return null;

    return (
        <div className="px-6 mt-3">
            <p className="text-sm text-zinc-300 leading-relaxed">
                {biography}
            </p>
        </div>
    );
}
export function SegudoresUser({ seguindo, seguidores }: { seguindo: number; seguidores: number; }) {
    return (
        <div className="flex gap-4 px-6 mt-3 text-sm text-zinc-400">
            <div className="flex items-center gap-1 hover:underline cursor-pointer">
                <span className="font-bold text-white">{seguindo}</span> Seguindo
            </div>
            <div className="flex items-center gap-1 hover:underline cursor-pointer">
                <span className="font-bold text-white">{seguidores}</span> Seguidores
            </div>
        </div>
    );
}
