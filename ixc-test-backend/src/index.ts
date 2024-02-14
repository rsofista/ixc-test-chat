import { json, urlencoded } from "body-parser";
import dotenv from "dotenv";
import http from "http";
import express, { ErrorRequestHandler, Express } from "express";
import mongoose from "mongoose";
import { messagesRoutes } from "./routes/messages.routes";
import { usersRoutes } from "./routes/users.routes";
import { Server } from "socket.io";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";
import { IcxSocket } from "./ixc-socket";
import { AuthService } from "./services/auth.service";

dotenv.config();

if (!process.env.DATABASE_URL) throw new Error(".env needs DATABASE_URL");

mongoose.connect(process.env.DATABASE_URL);

const app: Express = express();
const server = http.createServer(app);
const port = Number(process.env.PORT) || 3000;

new IcxSocket(
  new Server(server, {
    cors: {
      origin: "*",
    },
  }),
  new AuthService()
);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

app.use(
  cors({
    origin: "*",
  })
);
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use("/users", usersRoutes);
app.use("/messages", messagesRoutes);
app.use("/auth", authRoutes);

app.get("/", (_, res, next) => {
  res.json({ status: "👍" });
  next();
});

app.use(((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  next();
}) as ErrorRequestHandler);

// io.on("connection", (socket) => {
//   console.log("new connection", socket.handshake.query.token);
//   socket.on("message", (msg) => {
//     console.log("message", msg);
//   });
// });

server.listen(port, () => {
  console.log("server.listen", server.address());
});

declare global {
  namespace Express {
    interface AuthInfo {}
    type User = {
      userId: string;
      email: string;
      name: string;
      img?: string | null;
    };

    interface Request {
      authInfo?: AuthInfo | null;
      user?: User | null;
    }
  }
}
