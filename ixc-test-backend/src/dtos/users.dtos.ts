import { z } from "zod";

export type UserCreateDTO = z.infer<typeof userCreateDTO>;

const userCreateDTO = z.object({
  email: z.string(),
  name: z.string(),
  pass: z.string(),
  img: z.string().optional(),
});

export const usersDTOs = { userCreateDTO };
