import { z } from "zod";

export type AuthLoginDTO = z.infer<typeof authLoginDTO>;

const authLoginDTO = z.object({
  email: z.string(),
  pass: z.string(),
});

export const authDTOs = { authLoginDTO };
