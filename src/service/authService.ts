import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UsersModels } from "../models/users.model";
import { v4 as uuidv4 } from "uuid";

const client = new OAuth2Client();

const encryptPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
};

const checkPassword = (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "785137152023-776su8qaht1sl54f3aqhlatmad2a0ogj.apps.googleusercontent.com",
    });

    const response = ticket.getPayload();

    const payload = {
      id: response?.sub,
      role: "user",
    };

    const tokenJwt = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    res.status(201).json({ status: true, message: "Success", token: tokenJwt, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await UsersModels.query().findOne({ email });

    if (!user) {
      res.status(404).json({
        status: false,
        message: "Not Found - User not registered",
      });
      return;
    }

    if (!email || !password) {
      res.status(400).json({
        status: false,
        message: "Email or password wrong",
      });
      return;
    }

    const isPasswordMatch = await checkPassword(password, user.password);

    if (!isPasswordMatch) {
      res.status(400).json({
        status: false,
        message: "Username or password wrong",
      });
      return;
    } else {
      const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1d" });

      res.status(200).json({
        status: true,
        message: "Login Successfully",
        token,
        data: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const payload: { name: string; username: string; email: string; password: string } = req.body;
    const hashedPassword = await encryptPassword(payload.password);

    const existingUser = await UsersModels.query().findOne({ username: payload.username });
    const existingEmail = await UsersModels.query().findOne({ email: payload.email });

    if (payload.password.length < 6) {
      res.status(400).json({
        status: false,
        message: "Password must be at least 6 characters",
      });
      return;
    }

    if (existingUser) {
      res.status(400).json({
        status: false,
        message: "Username already registered",
      });
      return;
    }

    if (existingEmail) {
      res.status(400).json({
        status: false,
        message: "Email already registered",
      });
      return;
    }

    if (payload) {
      const user = await UsersModels.query().insert({
        ...payload,
        id: uuidv4(),
        password: hashedPassword,
        role: "user",
      });
      res.status(201).json({ status: true, message: "Register user successfully", data: user });
    } else {
      res.status(400).json({ status: false, message: "Failed to register user" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
