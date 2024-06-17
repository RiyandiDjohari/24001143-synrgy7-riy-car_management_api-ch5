import { Router } from "express";
import { login, loginWithGoogle, registerUser } from "../service/authService";

const router = Router();

router.post("/login", login);
router.post("/login/google", loginWithGoogle);
router.post("/register", registerUser)

export default router;
