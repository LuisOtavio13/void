import { HomePageIndex } from "@/features/home";
import { fetchCards } from "@/features/home/services/fetch-cards";
import { CardItem } from "@/features/home/types/types";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookiesStorage = await cookies();
  const jwt = cookiesStorage.get("jwt")?.value;
  let initialCards: CardItem[] = [];
  if (!jwt) return;
  try {
    initialCards = await fetchCards(0, jwt);
  } catch (error) {
    console.error(error);
  }
  return <HomePageIndex initialCards={initialCards} jwt={jwt} />;
}
