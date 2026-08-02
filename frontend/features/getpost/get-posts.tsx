import Footer from "@/shared/components/footer";
import {
  PageBreadcrumb,
  PageHeader,
  PageTitle,
  UserDatails,
} from "./components/page-user-post";
import { MD } from "@/shared/components/MD";
import { PostPage } from "./types/type";
import { notFound } from "next/navigation";
import { getPost } from "./services/get-post";
import { cores } from "../home";
import { CardTags } from "../home/components/client";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { LikeDislike } from "./components/like-deslike";
import { cookies } from "next/headers";
export async function GetPosts({ user, post }: PostPage) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  const postData = await getPost(Number(post), jwt || " ");

  if (!postData || !postData.user) notFound();
  const userData = postData.user;
  return (
    <div>
      <div className="border-b border-border">
        <PageHeader>
          <PageTitle
            title={postData.title}
            ownerPost={user}
            content={postData.description}
            tags={postData.tags}
            demoUrl={postData.demoLink}
            githubUrl={postData.githubLink}
            id={postData.id}
          />
          <UserDatails
          
            photo={userData.photo}
            name={userData.name}
            createdAt={postData.createdAt}
            updatedAt={postData.updatedAt}
          />
          <PageBreadcrumb
            name={userData.name}
            title={postData.title}
            ownerPost={user}
            post={post}
          />
            <LikeDislike id={postData.id} initialLikes={postData.likesCount} liked={postData.isLikedByUser} disliked={postData.isDesLikedByUser} initialDislikes={postData.desLikesCount}/>
           <CardTags tags={postData.tags} cores={cores} />
           
           
           
        </PageHeader>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <MD md={postData.description} />
      </div>
      <Footer />
    </div>
  );
}
