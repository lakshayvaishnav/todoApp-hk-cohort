import { z } from "zod";

export const signupInput = z.object({
  username: z.string().min(20).max(30),
  password: z.string().min(6).max(10),
});

export const loginInput = z.object({
  username: z.string().min(20).max(30),
  password: z.string().min(6).max(10),
});

export type SignupParams = z.infer<typeof signupInput>;
export type loginParams = z.infer<typeof loginInput>;
