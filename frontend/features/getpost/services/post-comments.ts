import { CommentFormData } from "../components/CommentInput";

export async function PostComment(
    content: string,
    idNumber: number,
    jwt: string,
    parentCommentId?: number
    
) {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                projectId: idNumber,
                content: content,
                parentCommentId: parentCommentId,
            }),
        }
    );

    if (!result.ok) {
        throw new Error(`Erro ao criar comentário: ${result.status}`);
    }

    return await result.json();
}