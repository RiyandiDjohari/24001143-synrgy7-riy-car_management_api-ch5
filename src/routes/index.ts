import { Router } from "express";
import carsRouter from "./carsRouter";
import usersRouter from "./usersRouter";
import ordersRouter from "./ordersRouter";

const router = Router();

router.use("/cars", carsRouter);
router.use("/users", usersRouter);
router.use("/orders", ordersRouter)

export default router;
