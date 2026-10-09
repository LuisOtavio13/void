"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProjectsByUserId } from "../service/get-projects-by-user";
import { Card } from "@/features/home/components/card";
import { HOME_SKELETON_COUNT } from "@/features/home/constants";
import { CardPost } from "@/features/home/components/card-post";

interface ProfileTabsProps {
    isOwner: boolean;
    jwt: string | undefined;
    id: Number;
}

export function ProfileTabs({ isOwner, jwt, id }: ProfileTabsProps) {
    const [activeTab, setActiveTab] = useState<"projects" | "hidden">("projects");

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["projects-user-" + id, jwt],
        queryFn: () => getProjectsByUserId({ id: Number(id), jwt }),
        enabled: !!id,
        retry: false,
    });

    const cards = Array.isArray(data) ? data : [];

    return (
        <div className="w-full mt-6">
            
            <div className="border-b border-zinc-800">
                <div className="flex px-6 space-x-8">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`pb-3 text-sm font-medium transition-colors relative ${
                            activeTab === "projects"
                                ? "text-white"
                                : "text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        Projetos
                        {activeTab === "projects" && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full" />
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab("hidden")}
                        className={`pb-3 text-sm font-medium transition-colors relative ${
                            activeTab === "hidden"
                                ? "text-white"
                                : "text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        Ocultos
                        {activeTab === "hidden" && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full" />
                        )}
                    </button>
                </div>
            </div>

            
            <div className="mt-6 mb-6 px-6">
                {activeTab === "projects" && (
                    <div className="flex flex-col gap-6">
                        {isLoading && (
                            <div className="flex flex-col gap-6 ">
                                {Array.from({ length: HOME_SKELETON_COUNT }, (_, index) => (
                                    <CardPost.Skeleton key={index} />
                                ))}
                            </div>
                        )}

                        {isError && (
                            <p className="text-red-500 text-sm">Erro ao carregar os projetos.</p>
                        )}

                        {!isLoading && !isError && (
                            <Card cards={cards} />
                        )}
                    </div>
                )}

                {activeTab === "hidden" && (
                    <div className="text-zinc-400 text-sm">
                        
                        Nenhum projeto oculto encontrado.
                    </div>
                )}
            </div>
        </div>
    );
}