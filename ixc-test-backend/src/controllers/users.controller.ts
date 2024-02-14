import { RequestHandler } from "express";
import { usersDTOs } from "../dtos/users.dtos";
import { usersService } from "../services/users.service";

const currentUser: RequestHandler = (req, res, next) => {
  res.json({ user: req.user });
  next();
};

const contacts: RequestHandler = async (req, res, next) => {
  res.json(await usersService.userContactList(req.user!.userId));

  next();
};

const create: RequestHandler = async (req, res, next) => {
  const dto = await usersDTOs.userCreateDTO.parseAsync(req.body).catch(next);

  if (!dto) return;

  const userExists = await usersService.exists(dto.email).catch(next);

  if (userExists === undefined) return;

  if (userExists) {
    return res.status(409).json({ message: "E-mail já existe, escolha outro" });
  }

  return usersService
    .create(dto)
    .then((user) => res.json(user))
    .catch(next);
};

export const usersController = { contacts, create, currentUser };
