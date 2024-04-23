import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

// zod to types
export type RegisterType = z.TypeOf<typeof registerSchema>;
