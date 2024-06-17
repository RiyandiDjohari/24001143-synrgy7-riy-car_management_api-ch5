import { Router } from "express";
import carsRouter from "./carsRouter";
import usersRouter from "./usersRouter";
import ordersRouter from "./ordersRouter";
import authRouter from "./authRouter";

const router = Router();

router.use("/cars", carsRouter);
router.use("/users", usersRouter);
router.use("/orders", ordersRouter)
router.use("/auth", authRouter)

export default router;
