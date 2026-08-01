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

export async function GetPosts({ user, post }: PostPage) {
  const postData = await getPost(Number(post));

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
          />
          <PageBreadcrumb
            name={userData.name}
            title={postData.title}
            ownerPost={user}
            post={post}
          />
        </PageHeader>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <MD md={postData.description} />
      </div>
      <Footer />
    </div>
  );
}
