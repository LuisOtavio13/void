import { CardTitle } from "@/shared/components/ui/card"
import { CardItem } from "../types/types"
import { CardPost, UserInfo, UserPopover } from "./card-post"
import Link from "next/link"
import { CardPostDescription, CardTags } from "./client"
import { LikeDislike } from "@/features/getpost/components/like-deslike"
import { FaGithub } from "react-icons/fa"
import { FiExternalLink } from "react-icons/fi"
import { HOME_CARD_COLORS } from "../constants"

export function Card({ cards }: { cards: CardItem[] }) {
    return (
        cards.map((card, index) => (
          <CardPost key={`${card.id}-${index}`}>
            <CardPost.Header>
              <div className="group relative flex items-center gap-3">
                <UserInfo user={card.user} />
                <UserPopover user={card.user} />
              </div>

              <CardTitle className="cursor-pointer text-xl font-bold tracking-tight hover:underline">
                <Link href={`/posts/${card.user.id}/${card.id}`}>
                  {card.title}
                </Link>
              </CardTitle>
            </CardPost.Header>

            <CardPost.Body>
              <CardPostDescription description={card.description} />
              <CardTags tags={card.tags} cores={HOME_CARD_COLORS} />

              <LikeDislike
                readOnly
                id={card.id}
                initialLikes={card.likesCount}
                liked={card.isLikedByUser}
                disliked={card.isDesLikedByUser}
                initialDislikes={card.desLikesCount}
                sla={false}
              />
            </CardPost.Body>

            {(card.githubLink || card.demoLink) && (
              <CardPost.Footer>
                <CardPost.Button
                  isActive={!!card.githubLink}
                  href={card.githubLink ?? ""}
                  icon={<FaGithub />}
                  title="GitHub"
                />

                <CardPost.Button
                  isActive={!!card.demoLink}
                  href={card.demoLink ?? ""}
                  icon={<FiExternalLink />}
                  title="Ver demo"
                />
              </CardPost.Footer>
            )}
          </CardPost>
        ))
    );
}