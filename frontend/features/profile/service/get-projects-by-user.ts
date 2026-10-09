import { CardItem } from "@/features/home/types/types";

interface props {
    id: number;
    jwt?: string;
}

export async function getProjectsByUserId({ id, jwt }: props): Promise<CardItem[]> {
    if (!id) {
        return [];
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/user/${id}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Erro ao carregar projetos do usuário (${response.status})`);
    }

    const payload = await response.json().catch(() => []);
    return Array.isArray(payload) ? payload : [];
}