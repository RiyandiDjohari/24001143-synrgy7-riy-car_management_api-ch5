import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  name: string;
  role: string;
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ status: false, message: "Unauthorized - Invalid Token" });
      return;
    }

    const token = jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET as string);

    (req as any).user = token;

    next();
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error from check auth" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user as JwtPayload;
  console.log(user);
  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      status: false,
      message: "Forbidden - Access denied, admin only.",
    });
  }
};
