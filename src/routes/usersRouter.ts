import { Router } from "express";
import { getUsers, getUsersById, deleteUserById, updateUser } from "../service/usersService";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUsersById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUser);

export default router;
