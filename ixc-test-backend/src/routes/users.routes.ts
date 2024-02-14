import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { authController } from "../controllers/auth.controller";

export const usersRoutes = Router();

usersRoutes.get("/contacts", authController.validate, usersController.contacts);
usersRoutes.get(
  "/current-user",
  authController.validate,
  usersController.currentUser
);
usersRoutes.post("/create", usersController.create);
