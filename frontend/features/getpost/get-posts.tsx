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
import { CommentList } from "./components/CommentList";
import { PostRealtime } from "./components/PostRealtime";
export async function GetPosts({ user, post }: PostPage) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  const postData = await getPost(Number(post), jwt || " ");

  if (!postData || !postData.user) notFound();
  const userData = postData.user;
  return (
    <div>
      <PostRealtime initialPost={postData} jwt={jwt ??" "} post={post} user={user} />
      
      <Footer />
    </div>
  );
}
