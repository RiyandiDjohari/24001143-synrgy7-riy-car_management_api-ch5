import { Router } from "express";
import { createUser, getUsers, getUsersById, deleteUserById, updateUser } from "../service/usersService";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/", createUser);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUser);

export default router;
