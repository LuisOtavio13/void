import { Profile } from "@/features/profile/profile";

interface ProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProfilePage({ params }: ProfileProps) {
  const resolvedParams = await params;
  
  
  const id: number = Number(resolvedParams.id);
  
  return <Profile id={id} />;
}