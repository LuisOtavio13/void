import { Profile } from "@/features/profile/profile";

interface profileProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function profile({params} : profileProps) {
    const id = Number((await params).id);
    return <Profile id={id}/>
}