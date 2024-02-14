import { z } from "zod";

export type MessageCreateDTO = z.infer<typeof messageCreateDTO>;

const messageCreateDTO = z.object({
  userId: z.string(),
  text: z.string(),
});

export const messagesDTOs = { messageCreateDTO };
