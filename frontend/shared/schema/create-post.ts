import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "titulo pode ter entre 1 e 100 caracteres")
    .max(100, "titulo pode ter entre 1 e 100 caracteres"),
  content: z
    .string()
    .min(1, "conteudo pode ter entre 1 e 5000 caracteres")
    .max(5000, "conteudo pode ter entre 1 e 5000 caracteres"),

  tags: z.array(z.string().min(2)).optional(),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
});
export type CreatePostSchema = z.infer<typeof createPostSchema>;
