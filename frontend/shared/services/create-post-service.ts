import { CreatePostSchema } from "@/shared/schema/create-post";
export class errCreatePost extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "errCreatePost";
    this.status = status;
  }
}
export async function createPostService(
  data: CreatePostSchema,
  token: string,
): Promise<Response> {
  const sla = {
    name: data.title,
    description: data.content,
    LinkGithub: data.githubUrl,
    linkProjeto: data.demoUrl,
    tags: data.tags?.map((tag) => {
      return { name: tag };
    }),
  };
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "posts/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sla),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new errCreatePost(error.error, response.status);
  }
  return response;
}
