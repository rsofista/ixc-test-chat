import { RequestHandler } from "express";
import { usersService } from "../services/users.service";
import { authDTOs } from "../dtos/auth.dtos";
import { authService } from "../services/auth.service";

const validate: RequestHandler = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  authService
    .verifyToken(token)
    .then(async (jwt) => {
      if (typeof jwt === "string")
        return res.status(500).json({ message: "?" });

      const user = await usersService.findByEmail(jwt.email);

      if (!user) return res.status(500).json({ message: "???" });

      req.user = usersService.userToExpressUser(user);
      next();
    })
    .catch(() => {
      res.sendStatus(403);
    });
};

const login: RequestHandler = async (req, res, next) => {
  const dto = await authDTOs.authLoginDTO.parseAsync(req.body).catch(next);

  if (!dto) return;

  const user = await usersService.findByEmail(dto.email);

  if (!user) return res.status(401).json({ message: "E-mail não existe..." });

  // TODO criptografar senha com bcrypt ou algo do tipo
  if (user.pass !== dto.pass)
    return res.status(401).json({ message: "Senha não confere!" });

  res.json({
    user: usersService.userToExpressUser(user),
    token: authService.generateAccessToken(user.email!),
  });
};

export const authController = { login, validate };
