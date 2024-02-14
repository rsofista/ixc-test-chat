import { Server, Socket } from "socket.io";
import { AuthService } from "./services/auth.service";
import { usersService } from "./services/users.service";
import { ModelUser } from "./models/user.model";
import { messagesService } from "./services/messages.service";

export class IcxSocket {
  constructor(private io: Server, private authService: AuthService) {
    this.io.on("connection", async (socket) => {
      console.log("connection");
      if (
        !socket.handshake.query.token ||
        typeof socket.handshake.query.token !== "string"
      )
        return;

      const jwt = await this.authService.verifyToken(
        socket.handshake.query.token
      );

      if (typeof jwt === "string") return;

      const user = await usersService.findByEmail(jwt.email);

      if (!user) return;

      this.setupSocketRoutes(socket, user);
    });
  }

  private setupSocketRoutes(socket: Socket, user: ModelUser) {
    socket.on("message", async (msg) => {
      console.log("message", msg);

      await messagesService.create(user._id.toString(), {
        userId: msg.userId,
        text: msg.text,
      });

      // TODO informações do usuário podem ser tanto de quem envia quanto recebe
      await usersService.pushLatestMessage(user._id.toString(), {
        date: new Date(),
        img: user.img,
        message: msg.text,
        name: user.name,
        read: false,
        userId: msg.userId,
      });

      this.io.emit("server-message", { userId: user._id.toString(), msg });
    });

    // TODO
    socket.on("login", (msg) => {
      console.log("login", msg);
      this.io.emit("server-login", { userId: user._id });
    });

    // TODO
    socket.on("disconnect", (reason) => {
      console.log("disconnect", reason);
      this.io.emit("server-logout", { userId: user._id });
    });
  }
}
