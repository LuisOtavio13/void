import { comments } from "../types/comments";

export async function get_comments(id_post: number, jwt: string | undefined): Promise<comments[]>{ 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}comments/project/${id_post}`,
        {
            method: "GET",
            headers: {
                 "Authorization":`Bearer ${jwt}`
            }
        }
    )

    if(!res.ok){
        console.log(res.status)
        throw new Error("deu bom n");
    }

    const comment: comments[]= await res.json();

    console.log(comment);

    return comment;


}