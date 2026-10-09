"use client";

import { useQuery } from "@tanstack/react-query";
import { getprofile } from "./service/get-profile";
import { toast } from "sonner";
import { ErrorProfile, LoadingProfile } from "./components/LoadingProfile";
import { BiographyUser, MetaPerfil, ProfileHeader, SegudoresUser } from "./components/Profile";
import { getUser } from "@/shared/context/user";
import { Separator } from "@/shared/components/ui/separator";
import { ProfileTabs } from "./components/ClienteProfile";


export function Profile({ id }: { id: number }) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["profile " + id],
        queryFn: () => getprofile({ id })
    });
    const { data: loggedUser } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });
    if (isError) {
        toast.error(error.message)
        const causeStr = getCauseMessage(error);
        return <ErrorProfile message={error.message} cause={causeStr} />
    }
    if (isLoading) {
        return <LoadingProfile />
    }
    console.log(loggedUser?.jwt)

    return (
        <div>
            <ProfileHeader avatarUrl={data?.photo ?? ""} bannerUrl={data?.bannerURL ?? ""} username={data?.name ?? ""} />
            <MetaPerfil
                bannerURL={data?.bannerURL ?? ""}
                email={data?.email ?? ""}
                id={data?.id ?? -1}
                isAdmin={data?.isAdmin ?? false}
                name={data?.name ?? ""}
                photo={data?.photo ?? ""}
                loggedUserId={loggedUser?.id}
                biography={data?.biography ?? ""}
            />
            <BiographyUser biography={data?.biography ?? ""} />
            <SegudoresUser seguidores={123} seguindo={1212} />
            <div className="px-6 my-4">
                <Separator />
            </div>
            <ProfileTabs isOwner={data?.id === loggedUser?.id} id={data?.id ?? 0} jwt={loggedUser?.jwt}/>

        </div>
    )
}