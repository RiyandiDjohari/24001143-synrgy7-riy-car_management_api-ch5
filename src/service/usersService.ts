import { Request, Response } from "express";
import { UsersModels } from "../models/users.model";

export const getUsers = async (req: Request, res: Response) => {
  const users = await UsersModels.query().withGraphFetched("orders");

  if (users) {
    res.status(200).json({ message: "Success", users });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const getUsersById = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const user = await UsersModels.query().findById(id).withGraphFetched("orders").throwIfNotFound();

  if (user) {
    res.status(200).json({ message: "Get user by id success", user });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const payload: { username: string; email: string; password: string; role: string } = req.body;
  const usersLength: number = (await UsersModels.query()).length;

  if (payload) {
    const user = await UsersModels.query().insert({
      id: usersLength + 1,
      ...payload,
    });
    res.status(201).json({ message: "Create new user successfully", user });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  let id: string = req.params.id;

  const deletedUser = await UsersModels.query().deleteById(id);
  if (deletedUser) {
    res.status(200).json({ message: `Delete User with id ${id} Success` });
  } else {
    res.status(404).json({ message: `User with id ${id} not found` });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const payload = req.body;

  const updatedUser = await UsersModels.query().findById(id).update(payload);

  if (updatedUser) {
    res.status(200).json({ message: `User with id ${id} Updated` });
  } else {
    res.status(400).json({ message: `User with id ${id} not found` });
  }
};
