import { UserDTO } from "../types/UserDTO";

export async function getprofile({id} :{id: number;}): Promise<UserDTO>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/user/${id}`);
    return res.json();
}

