import jwt from "jsonwebtoken";

export class AuthService {
  generateAccessToken(email: string) {
    return jwt.sign({ email }, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
  }

  verifyToken(token: string) {
    return new Promise<jwt.JwtPayload | string>((resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
        if (err) reject(err);
        else if (user) resolve(user);
        else reject(null);
      });
    });
  }
}

const generateAccessToken = (email: string) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
};

const verifyToken = (token: string) => {
  return new Promise<jwt.JwtPayload | string>((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
      if (err) reject(err);
      else if (user) resolve(user);
      else reject(null);
    });
  });
};

export const authService = { generateAccessToken, verifyToken };
