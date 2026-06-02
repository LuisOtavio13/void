import { z } from "zod";

const registroSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(1, "O nome é obrigatório"),
});

type RegistroSchema = z.infer<typeof registroSchema>;
export { registroSchema, type RegistroSchema };
