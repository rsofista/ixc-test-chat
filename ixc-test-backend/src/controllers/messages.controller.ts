import { RequestHandler } from "express";
import { messagesDTOs } from "../dtos/messages.dtos";
import { messagesService } from "../services/messages.service";
import { usersService } from "../services/users.service";

const create: RequestHandler = async (req, res, next) => {
  const dto = await messagesDTOs.messageCreateDTO
    .parseAsync(req.body)
    .catch(next);

  if (!dto) return;

  await usersService.pushLatestMessage("65c9a47782b008862a2341bb", {
    date: new Date(),
    img: "/damn.jpg",
    message: dto.text,
    name: "judas",
    read: false,
    userId: dto.userId,
  });

  return messagesService
    .create("65c9a47782b008862a2341bb", dto)
    .then((message) => res.json(message))
    .catch(next);
};

const listLatest: RequestHandler = (req, res, next) => {};

export const messagesController = { create, listLatest };
