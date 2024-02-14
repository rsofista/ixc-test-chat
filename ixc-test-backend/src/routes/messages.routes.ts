import { Router } from "express";
import { messagesController } from "../controllers/messages.controller";
import { authController } from "../controllers/auth.controller";

export const messagesRoutes = Router();

messagesRoutes.post(
  "/create",
  authController.validate,
  messagesController.create
);

messagesRoutes.get(
  "/from-user",
  authController.validate,
  messagesController.listLatest
);
