"use client";

import { useEffect, useState } from "react";
import { Post } from "../types/type";

import {
  PageBreadcrumb,
  PageHeader,
  PageTitle,
  UserDatails,
} from "./page-user-post";
import { LikeDislike } from "./like-deslike";
import { CardTags } from "@/features/home/components/client";
import { cores } from "@/features/home";
import { getPostRealTime } from "../realtime/getpost-realtime";
import { User } from "@/shared/types/UserType";
import { MD } from "@/shared/components/MD";
import { CommentList } from "./CommentList";

export function PostRealtime({
  initialPost,
  user,
  jwt,
  post,
}: {
  initialPost: Post;
  user: string;
  post: string;
  jwt:  string;
}) {
  const [postData, setPostData] = useState(initialPost);

  useEffect(() => {
    return getPostRealTime({
      setPost: setPostData,
      id: postData.id,
      idUser: Number(user)
    });
  }, [postData.id]);

  const userData = postData.user;

  return (
    <>
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
          photo={userData.avatar_url}
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

        <LikeDislike
          id={postData.id}
          initialLikes={postData.likesCount}
          liked={postData.isLikedByUser}
          disliked={postData.isDesLikedByUser}
          initialDislikes={postData.desLikesCount}
          sla={true}
        />

        <CardTags
          tags={postData.tags}
          cores={cores}
        />
      </PageHeader>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <MD md={postData.description} />

        <CommentList
          postId={Number(post)}
          jwt={jwt}
        />
      </div>
    </>
  );
}