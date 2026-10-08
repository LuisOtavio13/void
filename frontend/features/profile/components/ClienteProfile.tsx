"use client";

import { useState } from "react";

interface ProfileTabsProps {
    isOwner: boolean;
}

export function ProfileTabs({ isOwner }: ProfileTabsProps) {
    const [activeTab, setActiveTab] = useState<"projects" | "hidden">("projects");

    return (
        <div className="w-full mt-6 border-b border-zinc-800">
            <div className="flex px-6 space-x-8">

                <button
                    onClick={() => setActiveTab("projects")}
                    className={`pb-1 text-sm font-medium transition-colors relative ${activeTab === "projects"
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
                    className={`pb-1 text-sm font-medium transition-colors relative ${activeTab === "hidden"
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
    );
}