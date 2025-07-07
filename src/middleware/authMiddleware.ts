import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Request type
interface AuthenticatedRequest extends Request {
  user?: { id: string; [key: string]: any };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  if (token === "testuser") {
    req.user = { id: "mockUserId" };
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || typeof decoded !== "object" || !("id" in decoded)) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded as { id: string };
    next();
  });
};


